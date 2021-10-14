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
// import {blake2b} from 'blakejs'
// import bs58 from 'bs58'
// function ss58Decode(address) {
//   let a
//   try {
//     a = bs58.decode(address)
//   }
//   catch (e) {
//     return null
//   }
//   if (a[0] == 42) {
//     if (a.length == 32 + 1 + 2) {
//       let address = a.slice(0, 33)
//       let hash = blake2b(address)
//       if (a[33] == hash[0] && a[34] == hash[1]) {
//         return address.slice(1)
//       } else {
//         // invalid checksum
//         return null
//       }
//     } else {
//       // Invalid length.
//       return null
//     }
//   } else {
//     // Invalid version.
//     return null
//   }
// }
// function ss58Encode(address) {
//   if (address.length != 32) {
//     return null
//   }
//   let bytes = new Uint8Array([42, ...address])
//   let hash = blake2b(bytes)
//   let complete = new Uint8Array([...bytes, hash[0], hash[1]])
//   return bs58.encode(complete)
// }
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
function ksmAddrEncoder(data) {
    return encodeAddress((data));
}
function dotAddrEncoder(data) {
    return encodeAddress((data));
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
//# sourceMappingURL=encoder.js.map