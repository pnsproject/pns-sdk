import { Buffer as Buffer } from "buffer/";
import pkg from 'js-sha3';
const { keccak_256 } = pkg;
function isValidAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
}
function keccak(a) {
    return Buffer.from(keccak_256(a), 'hex');
}
export const stripHexPrefix = (str) => {
    return str.slice(0, 2) === '0x' ? str.slice(2) : str;
};
export const toChecksumAddress = (address, chainId = null) => {
    if (typeof address !== 'string') {
        throw new Error("stripHexPrefix param must be type 'string', is currently type " + (typeof address) + ".");
    }
    const strip_address = stripHexPrefix(address).toLowerCase();
    const prefix = chainId != null ? (chainId.toString() + '0x') : '';
    const keccak_hash = keccak(prefix + strip_address).toString('hex');
    let output = '0x';
    for (let i = 0; i < strip_address.length; i++)
        output += parseInt(keccak_hash[i], 16) >= 8 ?
            strip_address[i].toUpperCase() :
            strip_address[i];
    return output;
};
export function isValidChecksumAddress(address, chainId) {
    return isValidAddress(address) && (toChecksumAddress(address, chainId) === address);
}
function makeChecksummedHexEncoder() {
    return (data) => toChecksumAddress(data.toString('hex'), null);
}
function makeChecksummedHexDecoder() {
    return (data) => {
        const stripped = stripHexPrefix(data);
        if (!isValidChecksumAddress(data, null) &&
            stripped !== stripped.toLowerCase() &&
            stripped !== stripped.toUpperCase()) {
            throw Error('Invalid address checksum');
        }
        return Buffer.from(stripHexPrefix(data), 'hex');
    };
}
//////////
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
function ksmAddrEncoder(data) {
    return encodeAddress(data);
}
function dotAddrEncoder(data) {
    return encodeAddress(data);
}
function ksmAddrDecoder(data) {
    return Buffer.from(decodeAddress(data));
}
export const formats = [
    // {
    //   coinType: 0,
    //   decoder: makeBitcoinDecoder('bc', [[0x00]], [[0x05]]),
    //   encoder: makeBitcoinEncoder('bc', [0x00], [0x05]),
    //   name: 'BTC',
    // },
    {
        coinType: 60,
        decoder: makeChecksummedHexDecoder(),
        encoder: makeChecksummedHexEncoder(),
        name: 'ETH',
    },
    {
        coinType: 434,
        decoder: ksmAddrDecoder,
        encoder: ksmAddrEncoder,
        name: 'KSM',
    },
    {
        coinType: 354,
        decoder: ksmAddrDecoder,
        encoder: dotAddrEncoder,
        name: 'DOT',
    }
];
export const formatsByName = Object.assign({}, ...formats.map(x => ({ [x.name]: x })));
import contentHash from 'content-hash';
export function matchProtocol(text) {
    return text.match(/^(ipfs|ipns|sia|bzz|onion|onion3|arweave):\/\/(.*)/)
        || text.match(/\/(ipfs)\/(.*)/)
        || text.match(/\/(ipns)\/(.*)/);
}
export function decodeContenthash(encoded) {
    let decoded, protocolType, error;
    if (!encoded || encoded === '0x') {
        return {};
    }
    if (encoded.error) {
        return { protocolType: null, decoded: encoded.error };
    }
    else if (encoded === false) {
        return { protocolType: null, decoded: 'invalid value' };
    }
    if (encoded) {
        try {
            decoded = contentHash.decode(encoded);
            const codec = contentHash.getCodec(encoded);
            if (codec === 'ipfs-ns') {
                protocolType = 'ipfs';
            }
            else if (codec === 'ipns-ns') {
                protocolType = 'ipns';
            }
            else if (codec === 'swarm-ns') {
                protocolType = 'bzz';
            }
            else if (codec === 'onion') {
                protocolType = 'onion';
            }
            else if (codec === 'onion3') {
                protocolType = 'onion3';
            }
            else if (codec === 'skynet-ns') {
                protocolType = 'sia';
            }
            else if (codec === 'arweave-ns') {
                protocolType = 'arweave';
            }
            else {
                decoded = encoded;
            }
        }
        catch (e) {
            error = e.message;
        }
    }
    return { protocolType, decoded, error };
}
export function encodeContenthash(text) {
    let content, contentType;
    let encoded = null;
    let error;
    if (!!text) {
        let matched = matchProtocol(text);
        if (matched) {
            contentType = matched[1];
            content = matched[2];
        }
        try {
            if (contentType === 'ipfs') {
                if (content.length >= 4) {
                    encoded = '0x' + contentHash.encode('ipfs-ns', content);
                }
            }
            else if (contentType === 'ipns') {
                encoded = '0x' + contentHash.encode('ipns-ns', content);
            }
            else if (contentType === 'bzz') {
                if (content.length >= 4) {
                    encoded = '0x' + contentHash.fromSwarm(content);
                }
            }
            else if (contentType === 'onion') {
                if (content.length == 16) {
                    encoded = '0x' + contentHash.encode('onion', content);
                }
            }
            else if (contentType === 'onion3') {
                if (content.length == 56) {
                    encoded = '0x' + contentHash.encode('onion3', content);
                }
            }
            else if (contentType === 'sia') {
                if (content.length == 46) {
                    encoded = '0x' + contentHash.encode('skynet-ns', content);
                }
            }
            else if (contentType === 'arweave') {
                if (content.length == 43) {
                    encoded = '0x' + contentHash.encode('arweave-ns', content);
                }
            }
            else {
                console.warn('Unsupported protocol or invalid value', {
                    contentType,
                    text
                });
            }
        }
        catch (err) {
            const errorMessage = 'Error encoding content hash';
            console.warn(errorMessage, { text, encoded });
            error = errorMessage;
            //throw 'Error encoding content hash'
        }
    }
    return { encoded, error };
}
// export function isHexString(value: any, length?: number): boolean {
//     if (typeof(value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
//         return false
//     }
//     if (length && value.length !== 2 + 2 * length) { return false; }
//     return true;
// }
function isHexString(value, length) {
    if (typeof (value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
function isValidContenthashUrl(data) {
    return !!matchProtocol(data);
}
export function decodeContentUrl(url) {
    return encodeContenthash(url).encoded;
}
export function encodeContentUrl(data) {
    data = decodeContenthash(data);
    return data.protocolType + "://" + data.decoded;
}
export function validateContent(encoded) {
    return contentHash.isHashOfType(encoded, contentHash.Types.ipfs) || contentHash.isHashOfType(encoded, contentHash.Types.swarm);
}
export function isValidContenthash(encoded) {
    try {
        const codec = contentHash.getCodec(encoded);
        return isHexString(encoded);
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
export function getProtocolType(encoded) {
    let protocolType, decoded;
    try {
        let matched = matchProtocol(encoded);
        if (matched) {
            protocolType = matched[1];
            decoded = matched[2];
            return {
                protocolType: matched[1],
                decoded: matched[2]
            };
        }
        else {
            return {
                protocolType: 'none',
                decoded: ''
            };
        }
    }
    catch (e) {
        console.log(e);
        return {
            protocolType: 'error',
            decoded: ''
        };
    }
}
// export export matchProtocol
// export decodeContenthash
// export encodeContenthash
// export validateContent
// export isValidContenthash
// export getProtocolType
// export encodeContentUrl
// export decodeContentUrl
//# sourceMappingURL=encoder.js.map