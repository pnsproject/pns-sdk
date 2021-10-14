import { ethers, BigNumber } from "ethers";
import { Buffer as Buffer } from "buffer/";

import pkg from 'js-sha3'
const { keccak_256 } = pkg;

function isValidAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address)
}
function keccak(a) {
    return Buffer.from(keccak_256(a), 'hex')
}

export const stripHexPrefix = (str) => {
    return str.slice(0, 2) === '0x' ? str.slice(2) : str
};

export const toChecksumAddress = (address, chainId = null) => {
    if (typeof address !== 'string') {
        throw new Error("stripHexPrefix param must be type 'string', is currently type " + (typeof address) + ".");
    }
    const strip_address = stripHexPrefix(address).toLowerCase()
    const prefix = chainId != null ? (chainId.toString() + '0x') : ''
    const keccak_hash = keccak(prefix + strip_address).toString('hex')
    let output = '0x'

    for (let i = 0; i < strip_address.length; i++)
        output += parseInt(keccak_hash[i], 16) >= 8 ?
            strip_address[i].toUpperCase() :
            strip_address[i];
    return output
};

export function isValidChecksumAddress(address, chainId) {
    return isValidAddress(address) && (toChecksumAddress(address, chainId) === address)
}


function makeChecksummedHexEncoder() {
  return (data: Buffer) => toChecksumAddress(data.toString('hex'), null);
}

function makeChecksummedHexDecoder() {
  return (data: string) => {
    const stripped = stripHexPrefix(data);
    if (
      !isValidChecksumAddress(data,  null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error('Invalid address checksum');
    }
    return Buffer.from(stripHexPrefix(data), 'hex');
  };
}

export interface IFormat {
  coinType: number;
  name: string;
  encoder: (data: Buffer) => string;
  decoder: (data: string) => Buffer;
}

export const formats: IFormat[] = [
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
  // {
  //   coinType: 434,
  //   decoder: ksmAddrDecoder,
  //   encoder: ksmAddrEncoder,
  //   name: 'KSM',
  // },
  // {
  //   coinType: 354,
  //   decoder: ksmAddrDecoder,
  //   encoder: dotAddrEncoder,
  //   name: 'DOT',
  // }
];

export const formatsByName: { [key: string]: IFormat } = Object.assign({}, ...formats.map(x => ({ [x.name]: x })));
