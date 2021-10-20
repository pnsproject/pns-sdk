import { ethers } from "ethers";
import { keccak_256 } from 'js-sha3';
import { Buffer as Buffer } from "buffer/";
import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
export const formatEther = ethers.utils.formatEther;
let provider;
let signer;
let account;
let networkId;
let ens;
let resolver;
let registrar;
let ensAddr;
let resolverAddr;
let registrarAddr;
let coinTypes = {
    BTC: 0,
    ETH: 60,
    DOT: 354,
    KSM: 434,
};
const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];
const emptyAddress = "0x0000000000000000000000000000000000000000";
const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
const tld = "dot";
const DAYS = 24 * 60 * 60;
const INFURA_URL = "https://rinkeby.infura.io/v3/75e0d27975114086be0463cf2597549e";
const ResolverAbi = [{ "inputs": [{ "internalType": "contract IPNS", "name": "pns", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "string", "name": "keyIndex", "type": "string" }, { "indexed": false, "internalType": "string", "name": "key", "type": "string" }], "name": "NewKey", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ResetRecords", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "string", "name": "keyIndex", "type": "string" }, { "indexed": true, "internalType": "string", "name": "valueIndex", "type": "string" }, { "indexed": false, "internalType": "string", "name": "key", "type": "string" }, { "indexed": false, "internalType": "string", "name": "value", "type": "string" }], "name": "Set", "type": "event" }, { "inputs": [], "name": "_pns", "outputs": [{ "internalType": "contract IPNS", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "key", "type": "string" }], "name": "addKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "key", "type": "string" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "get", "outputs": [{ "internalType": "string", "name": "value", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "keyHash", "type": "uint256" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getByHash", "outputs": [{ "internalType": "string", "name": "key", "type": "string" }, { "internalType": "string", "name": "value", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "keyHash", "type": "uint256" }], "name": "getKey", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "hashes", "type": "uint256[]" }], "name": "getKeys", "outputs": [{ "internalType": "string[]", "name": "values", "type": "string[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getMany", "outputs": [{ "internalType": "string[]", "name": "values", "type": "string[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "keyHashes", "type": "uint256[]" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getManyByHash", "outputs": [{ "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "key", "type": "string" }, { "internalType": "string", "name": "value", "type": "string" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "keyHash", "type": "uint256" }, { "internalType": "string", "name": "value", "type": "string" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "setByHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "setMany", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "keyHashes", "type": "uint256[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "setManyByHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const RegistrarAbi = [{ "inputs": [{ "internalType": "contract IPNS", "name": "pns", "type": "address" }, { "internalType": "uint256", "name": "_baseNode", "type": "uint256" }, { "internalType": "uint256[]", "name": "_basePrices", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_rentPrices", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256[]", "name": "prices", "type": "uint256[]" }], "name": "BasePriceChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "cost", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "expires", "type": "uint256" }], "name": "NameRenewed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256[]", "name": "prices", "type": "uint256[]" }], "name": "RentPriceChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousRoot", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newRoot", "type": "address" }], "name": "RootOwnershipTransferred", "type": "event" }, { "inputs": [], "name": "DEFAULT_DOMAIN_CAPACITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GRACE_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MIN_REGISTRATION_DURATION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_pns", "outputs": [{ "internalType": "contract IPNS", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "available", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseNode", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "basePrices", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "capacity", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "children", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "expires", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "end", "type": "uint256" }], "name": "mintRedeem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "nameExpires", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "code", "type": "bytes" }], "name": "nameRedeem", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes", "name": "code", "type": "bytes" }], "name": "nameRedeemAny", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "nameRegister", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "origin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "parent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bytes", "name": "code", "type": "bytes" }], "name": "recoverKey", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "registerPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "renew", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "renewByRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "rentPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rentPrices", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "root", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_basePrices", "type": "uint256[]" }], "name": "setBasePrices", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_rentPrices", "type": "uint256[]" }], "name": "setRentPrices", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "setSubdomain", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "totalRegisterPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newRoot", "type": "address" }], "name": "transferRootOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "valid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "validLong", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" }];
const EnsAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "resolver", "type": "address" }], "name": "NewResolver", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "NewSubnameOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousRoot", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newRoot", "type": "address" }], "name": "RootOwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "exists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "isApprovedOrOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "newTokenId", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "mintSubdomain", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "resolver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "root", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "_approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "resolver", "type": "address" }], "name": "setResolver", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newRoot", "type": "address" }], "name": "transferRootOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
export const ContractAddrMap = {
    1281: {
        ens: "0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3",
        resolver: "0x962c0940d72E7Db6c9a5F81f1cA87D8DB2B82A23",
        registrar: "0x970951a12F975E6762482ACA81E57D5A2A4e73F4"
    },
    4: {
        ens: "0x54CF46151d90b0a7880E4cBA8528dFBBeB718546",
        resolver: "0xFD1d96e2F2a039F7b41Bf09a9793E558D474e537",
        registrar: "0x3a2c8F8e6c7095B59EA18A34f009887B6B9bfCbb"
    }
};
export function sha3(data) {
    return "0x" + keccak_256(data);
}
export function getNamehash(name) {
    let node = '0000000000000000000000000000000000000000000000000000000000000000';
    if (name) {
        let labels = name.split('.');
        for (let i = labels.length - 1; i >= 0; i--) {
            let labelSha = keccak_256(labels[i]);
            node = keccak_256(Buffer.from(node + labelSha, 'hex'));
        }
    }
    return '0x' + node;
}
export async function setProvider(providerOpt) {
    if (!!providerOpt) {
        provider = providerOpt;
        signer = await provider.getSigner();
        account = await signer.getAddress();
    }
    else if (provider && account) {
        return;
    }
    else if (!!window && typeof window.ethereum !== "undefined") {
        // 调用窗口, 登录账户
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        account = await signer.getAddress();
    }
    else {
        console.log("cannot find a global `ethereum` object");
        provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
        account = "0x0";
    }
    networkId = (await provider.getNetwork()).chainId;
    console.log("network", networkId);
    return;
}
export async function setup(ensAddress, resolverAddress, registrarAddress, providerOpt) {
    if (provider && ens && !providerOpt) {
        return {
            provider,
            signer,
            ens,
            resolver,
            registrar,
        };
    }
    await setProvider(providerOpt);
    console.log("set provider");
    let addrMap = ContractAddrMap[networkId];
    console.log('addrs', addrMap);
    ensAddress = ensAddress || addrMap.ens;
    resolverAddress = resolverAddress || addrMap.resolver;
    registrarAddress = registrarAddress || addrMap.registrar;
    if (signer) {
        ens = new ethers.Contract(ensAddress, EnsAbi, signer);
        resolver = new ethers.Contract(resolverAddress, ResolverAbi, signer);
        registrar = new ethers.Contract(registrarAddress, RegistrarAbi, signer);
    }
    else {
        ens = new ethers.Contract(ensAddress, EnsAbi, provider);
        resolver = new ethers.Contract(resolverAddress, ResolverAbi, provider);
        registrar = new ethers.Contract(registrarAddress, RegistrarAbi, provider);
    }
    ensAddr = ensAddress;
    resolverAddr = resolverAddress;
    return {
        provider,
        signer,
        ens,
        resolver,
        registrar,
    };
}
export async function setupByContract(ensContract, resolverContract, registrarContract, providerOpt) {
    await setProvider(providerOpt);
    console.log("set provider");
    ens = ensContract;
    resolver = resolverContract;
    registrar = registrarContract;
    ensAddr = ens.address;
    resolverAddr = resolver.address;
    return {
        provider,
        signer,
        ens,
        resolver,
        registrar,
    };
}
export function getProvider() {
    return provider;
}
export function getSigner() {
    return signer;
}
export function getAccount() {
    return account;
}
/** 获取域名的当前所有者 */
export async function getOwner(name) {
    let namehash = getNamehash(name);
    return ens.ownerOf(namehash);
}
/** 获取域名的解析器合约 */
export function getResolver(name) {
    let namehash = getNamehash(name);
    return ens.resolver(namehash);
}
export async function addKey(key) {
    return await resolver.addKey(key);
}
export async function setKey(name, key, value) {
    const namehash = getNamehash(name);
    await resolver.set(key, value, namehash);
}
export async function getKey(name, key) {
    const namehash = getNamehash(name);
    return await resolver.get(key, namehash);
}
/** 获取域名的解析地址 */
export async function getAddr(name, key) {
    const namehash = getNamehash(name);
    try {
        let coinType = coinTypes[key];
        const addr = await resolver.addr(namehash, coinType);
        if (addr === "0x")
            return emptyAddress;
        // return encoder(Buffer.from(addr.slice(2), 'hex'))
        return addr;
    }
    catch (e) {
        console.log(e);
        console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
        return emptyAddress;
    }
}
/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 name) returns (uint64)
 * getTTL('hero.eth') */
export function getText(name, key) {
    let namehash = getNamehash(name);
    return resolver.get("text." + key, namehash);
}
/** 获得域名的IPFS内容地址 */
export async function getContent(name) {
    const namehash = getNamehash(name);
    const encoded = await resolver.get("contenthash", namehash);
    // todo
    return {
        value: `ipfs://${ethers.utils.base58.encode(encoded)}`,
        contentType: "contenthash",
    };
}
function buildKeyValueObjects(keys, values) {
    return values.map((record, i) => ({
        key: keys[i],
        value: record,
    }));
}
export function getLabelhash(rawlabel) {
    if (rawlabel === "[root]") {
        return "";
    }
    return rawlabel.startsWith("[") && rawlabel.endsWith("]") && rawlabel.length === 66 ? "0x" + rawlabel.slice(1, -1) : "0x" + keccak_256(rawlabel);
}
function decodeLabelhash(hash) {
    if (!(hash.startsWith("[") && hash.endsWith("]") && hash.length === 66)) {
        throw Error("Expected encoded labelhash in [hash] form");
    }
    return `${hash.slice(1, -1)}`;
}
/** 获得域名详细信息 */
export async function getDomainDetails(name) {
    const nameArray = name.split(".");
    const label = nameArray[0];
    const labelhash = getLabelhash(label);
    const nameResolver = await getResolver(name);
    const owner = await getOwner(name);
    const promises = TEXT_RECORD_KEYS.map((key) => getText(name, key));
    const records = await Promise.all(promises);
    let textRecords = buildKeyValueObjects(TEXT_RECORD_KEYS, records);
    const node = {
        name,
        label,
        labelhash,
        owner,
        nameResolver,
        textRecords: textRecords,
    };
    const content = await getContent(name);
    // todo: render addr correctly
    // todo: batch read
    // todo: subgraph
    return {
        ...node,
        addrs: [
            { key: "BTC", value: await getAddr(name, "BTC") },
            { key: "ETH", value: await getAddr(name, "ETH") },
            { key: "DOT", value: await getAddr(name, "DOT") },
            { key: "KSM", value: await getAddr(name, "KSM") },
        ],
        content: content.value,
        contentType: "ipfs",
    };
}
export async function totalRegisterPrice(name, duration) {
    let result = await registrar.totalRegisterPrice(name, duration);
    return result;
}
export async function rentPrice(name, duration) {
    let result = await registrar.rentPrice(name, duration);
    return result;
}
export async function nameExpires(label) {
    // label = "0x" + keccak_256(label) || "0x0";
    return registrar.nameExpires(getNamehash(label));
}
export async function available(label) {
    // label = "0x" + keccak_256(label) || "0x0";
    return registrar.available(getNamehash(label));
}
/** 域名注册 */
export async function register(label, account, duration) {
    const price = await totalRegisterPrice(label, duration);
    return registrar.nameRegister(label, account, duration, { value: price, gasLimit: 500000 });
}
export async function controllerRoot() {
    return registrar.root();
}
export async function mintRedeem(start, end) {
    return registrar.mintRedeem(start, end);
}
export async function nameRedeemAny(label, account, duration, nonce, code) {
    return registrar.nameRedeemAny(label, account, duration, nonce, code);
}
function encodeNameMsg(name, duration, nonce) {
    let durationEncoded = ethers.utils.defaultAbiCoder.encode(["uint"], [duration]).slice(2);
    let durationBuffer = Buffer.from(durationEncoded, "hex");
    let nonceEncoded = ethers.utils.defaultAbiCoder.encode(["uint"], [nonce]).slice(2);
    let nonceBuffer = Buffer.from(nonceEncoded, "hex");
    let encodeName = Buffer.from(name.slice(2), "hex");
    return Buffer.concat([encodeName, durationBuffer, nonceBuffer]);
}
function encodeMsg(duration, nonce) {
    let durationEncoded = ethers.utils.defaultAbiCoder.encode(["uint"], [duration]).slice(2);
    let durationBuffer = Buffer.from(durationEncoded, "hex");
    let nonceEncoded = ethers.utils.defaultAbiCoder.encode(["uint"], [nonce]).slice(2);
    let nonceBuffer = Buffer.from(nonceEncoded, "hex");
    return Buffer.concat([durationBuffer, nonceBuffer]);
}
function hashMsg(data) {
    let hashed = '0x' + keccak_256(data);
    return ethers.utils.arrayify(hashed);
}
export async function generateRedeemCode(duration, nonce) {
    let hashedMsg = hashMsg(encodeMsg(duration, nonce));
    let signer = getSigner();
    return signer.signMessage(hashedMsg);
}
export async function renew(label, duration) {
    const price = await rentPrice(label, duration);
    return registrar.renew(label, duration, { value: price, gasLimit: 500000 });
}
/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export function setResolver(name, resolver) {
    name = suffixTld(name);
    let namehash = getNamehash(name);
    resolver = resolver || resolverAddr;
    return ens.setResolver(namehash, resolver);
}
/** 设置域名的所有者
 * function setOwner(bytes32 name, address owner)
 * setOwner('hero.eth', '0x123456789') */
export async function setOwner(name, newOwner) {
    let namehash = getNamehash(name);
    let oldOwner = await getOwner(name);
    return await ens['safeTransferFrom(address,address,uint256)'](oldOwner, newOwner, namehash);
}
// /** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
//  * function setTTL(bytes32 name, uint64 ttl)
//  * setTTL('hero.eth', 3600) */
//  export function setTTL(name: DomainString, ttl: number): Promise<void> {
//   let namehash = getNamehash(name);
//   return ens.setTTL(namehash, ttl);
// }
/** 设置域名的解析地址 */
export async function setAddr(name, key, value) {
    const namehash = getNamehash(name);
    // const resolverAddr = await ensContract.resolver(namehash)
    try {
        // let coinType = coinTypes[key];
        const addr = await resolver.setKey(namehash, key, value);
        if (addr === "0x")
            return emptyAddress;
        return addr;
    }
    catch (e) {
        console.log(e);
        console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
        return emptyAddress;
    }
}
export function setText(name, key, value) {
    let namehash = getNamehash(name);
    // return resolver.setText(namehash, key, value);
    return resolver.set("text." + key, value, namehash);
}
export function setContent(name, value) {
    let namehash = getNamehash(name);
    return resolver.set("contenthash", value, namehash);
    // return resolver.setContenthash(namehash, value);
}
/** 一次性设置域名信息
 * function setRecord(bytes32 name, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setRecord(name, newOwner, resolver, ttl) {
    let namehash = getNamehash(name);
    return ens.setRecord(namehash, newOwner, resolver, ttl);
}
/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export function mintSubdomain(name, label, newOwner) {
    let namehash = getNamehash(name);
    return ens.mintSubdomain(namehash, label, newOwner);
}
// /** 设置子域名的所有者
//  * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
//  * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
// export function setSubnodeOwner(name: DomainString, label: string, newOwner: HexAddress): Promise<any> {
//   let namehash = getNamehash(name);
//   label = "0x" + keccak_256(label) || "0x0";
//   return ens.setSubnodeOwner(namehash, label, newOwner);
// }
// /** 一次性设置域名信息
//  * function setSubnodeRecord(bytes32 name, bytes32 label, address owner, address resolver, uint64 ttl)
//  * setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
// export function setSubnodeRecord(name: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
//   let namehash = getNamehash(name);
//   label = "0x" + keccak_256(label) || "0x0";
//   return ens.setSubnodeRecord(namehash, label, newOwner, resolver, ttl);
// }
// /** 根据名字设置子域名的所有者
//  * function setSubnodeOwner(bytes32 name, string subname, address owner)
//  * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
// export function setSubnameOwner(name: DomainString, subname: string, newOwner: HexAddress): Promise<any> {
//   let namehash = getNamehash(name);
//   return ens.setSubnameOwner(namehash, subname, newOwner);
// }
// /** 根据名字一次性设置域名信息
//  * function setSubnameRecord(bytes32 name, string subname, address owner, address resolver, uint64 ttl)
//  * setSubnameRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
// export function setSubnameRecord(name: DomainString, subname: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
//   let namehash = getNamehash(name);
//   return ens.setSubnameRecord(namehash, subname, newOwner, resolver, ttl);
// }
export function matchProtocol(text) {
    return text.match(/^(ipfs|sia|ipns|bzz|onion|onion3):\/\/(.*)/) || text.match(/\/(ipfs)\/(.*)/) || text.match(/\/(ipns)\/(.*)/);
}
export function getProtocolType(encoded) {
    let protocolType = 'ipfs://', decoded = '';
    try {
        let matched = matchProtocol(encoded);
        if (matched) {
            protocolType = matched[1];
            decoded = matched[2];
        }
        return {
            protocolType,
            decoded,
        };
    }
    catch (e) {
        console.log(e);
        return {
            protocolType,
            decoded,
        };
    }
}
/** 解析IPFS地址 */
export function decodeIpfsUrl(url) {
    let data = getProtocolType(url);
    return "0x" + Buffer.from(ethers.utils.base58.decode(data.decoded)).toString("hex");
}
export async function setDomainDetails(name, textRecords, addrs, content) {
    await Promise.all(textRecords.map(async (item) => {
        if (item.value && item.value !== "") {
            await setText(name, item.key, item.value);
        }
    }));
    await Promise.all(addrs.map(async (item) => {
        if (item.value && item.value !== "") {
            await setAddr(name, item.key, item.value);
        }
    }));
    if (content && content !== "") {
        await setContent(name, content);
    }
}
/** 目前使用的都都是基于 eth 的域名, 后续扩展再拆分函数 */
export function isValidDomain(rawName) {
    let name = rawName.endsWith("." + tld) ? rawName : `${rawName}.${tld}`;
    return name.length > 3 && name.length < 64 && checkDomain(name, { allowUnicode: false, subdomain: false });
}
//////////////////////
export function getTld() {
    return "dot";
}
export function suffixTld(label) {
    return label.replace(".dot", "") + ".dot";
}
export function removeTld(label) {
    return label.replace(".dot", "");
}
/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export function setDefaultResolver(name) {
    let namehash = getNamehash(name);
    return ens.setResolver(namehash, resolverAddr);
}
export async function tryLogin() {
    await setup();
}
const hasuraUrl = "https://trusted-quagga-17.hasura.app/v1/graphql";
/** 列出用户的域名列表 */
export async function getDomains(account) {
    let query = "{\"query\":\"{domains(order_by: {name: asc}, where: {owner: {_eq: \\\"" + account + "\\\"}}, distinct_on: name) {id name owner expires } }\",\"variables\":null}";
    let resp = await fetch(hasuraUrl, {
        "headers": {
            "content-type": "application/json",
        },
        "body": query,
        "method": "POST",
    });
    resp = await resp.json();
    return resp.data.domains;
}
/** 列出域名的子域名列表 */
export async function getSubdomains(domain) {
    let query = "{\"query\":\"{subdomains(order_by: {label: asc}, where: {node: {_eq: \\\"" + domain + "\\\"}}, distinct_on: label) {id node label owner } }\",\"variables\":null}";
    let resp = await fetch(hasuraUrl, {
        "headers": {
            "content-type": "application/json",
        },
        "body": query,
        "method": "POST",
    });
    resp = await resp.json();
    return resp.data.subdomains;
}
//// valid domain
const sldMap = {
    "ac.cn": true,
    "com.cn": true,
    "edu.cn": true,
    "gov.cn": true,
    "mil.cn": true,
    "net.cn": true,
    "org.cn": true,
};
function checkDomain(value, opts) {
    if (typeof value !== 'string')
        return false;
    if (!(opts instanceof Object))
        opts = {};
    value = value.toLowerCase();
    if (value.endsWith('.')) {
        value = value.slice(0, value.length - 1);
    }
    if (value.length > 253) {
        return false;
    }
    const validChars = /^([a-z0-9-._*]+)$/g;
    if (!validChars.test(value)) {
        return false;
    }
    const sldRegex = /(.*)\.(([a-z0-9]+)(\.[a-z0-9]+))/;
    const matches = value.match(sldRegex);
    var tld = null;
    var labels = null;
    if (matches && matches.length > 2) {
        if (sldMap[matches[2]]) {
            tld = matches[2];
            labels = matches[1].split('.');
        }
    }
    if (!labels) {
        labels = value.split('.');
        if (labels.length <= 1)
            return false;
        tld = labels.pop();
        const tldRegex = /^(?:xn--)?(?!^\d+$)[a-z0-9]+$/gi;
    }
    if (opts.subdomain === false && labels.length > 1)
        return false;
    const isValid = labels.every(function (label, index) {
        if (opts.wildcard && index === 0 && label === '*' && labels.length > 1) {
            return true;
        }
        let validLabelChars = /^([a-zA-Z0-9-_]+)$/g;
        if (index === labels.length - 1) {
            validLabelChars = /^([a-zA-Z0-9-]+)$/g;
        }
        const doubleDashCount = (label.match(/--/g) || []).length;
        const xnDashCount = (label.match(/xn--/g) || []).length;
        if (doubleDashCount !== xnDashCount) {
            return false;
        }
        const isValid = (validLabelChars.test(label) &&
            label.length < 64 &&
            !label.startsWith('-') &&
            !label.endsWith('-'));
        return isValid;
    });
    return isValid;
}
//# sourceMappingURL=sdk.js.map