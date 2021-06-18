/// <reference path="./typings.d.ts" />

import { Buffer as Buffer } from "buffer/";
import { keccak_256 as sha3 } from "js-sha3";
import { ethers, Contract, BigNumber } from "ethers";

import { EnsAbi, RegistrarAbi, ResolverAbi, ETHRegistrarControllerAbi, BulkRenewalAbi } from "./contracts";

import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";

import { HexAddress, DomainString } from "./types";

import isValidDomain from "is-valid-domain";

import contentHash from '@ensdomains/content-hash'


// utils

function normalize(name: string): string {
  return name;
}

function encodeLabelhash(hash: HexAddress) {
  if (!hash.startsWith("0x")) {
    throw new Error("Expected label hash to start with 0x");
  }

  if (hash.length !== 66) {
    throw new Error("Expected label hash to have a length of 66");
  }

  return `[${hash.slice(2)}]`;
}

function decodeLabelhash(hash) {
  if (!(hash.startsWith("[") && hash.endsWith("]"))) {
    throw Error("Expected encoded labelhash to start and end with square brackets");
  }

  if (hash.length !== 66) {
    throw Error("Expected encoded labelhash to have a length of 66");
  }

  return `${hash.slice(1, -1)}`;
}

function isEncodedLabelhash(hash) {
  return hash.startsWith("[") && hash.endsWith("]") && hash.length === 66;
}

function isDecrypted(name) {
  const nameArray = name.split(".");
  const decrypted = nameArray.reduce((acc, label) => {
    if (acc === false) return false;
    return isEncodedLabelhash(label) ? false : true;
  }, true);

  return decrypted;
}

function labelhash(unnormalisedLabelOrLabelhash) {
  if (unnormalisedLabelOrLabelhash === "[root]") {
    return "";
  }
  return isEncodedLabelhash(unnormalisedLabelOrLabelhash)
    ? "0x" + decodeLabelhash(unnormalisedLabelOrLabelhash)
    : "0x" + sha3(normalize(unnormalisedLabelOrLabelhash));
}

function namehash(inputName: string): HexAddress {
  if (inputName === "[root]") {
    return "0x0000000000000000000000000000000000000000000000000000000000000000";
  }
  let node = "";
  for (let i = 0; i < 32; i++) {
    node += "00";
  }

  if (inputName) {
    const labels = inputName.split(".");

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha;
      if (isEncodedLabelhash(labels[i])) {
        labelSha = decodeLabelhash(labels[i]);
      } else {
        let normalisedLabel = normalize(labels[i]);
        labelSha = sha3(normalisedLabel);
      }
      node = sha3(new Buffer(node + labelSha, "hex"));
    }
  }

  return "0x" + node;
}

function getNamehash(name: string): HexAddress {
  return namehash(name)
}

export const stripHexPrefix = (str: HexAddress): string => {
    return str.slice(0, 2) === '0x' ? str.slice(2) : str
};
export const toChecksumAddress = (address: HexAddress, chainId?: number = null) => {
    if (typeof address !== 'string') {
        throw new Error("stripHexPrefix param must be type 'string', is currently type " + (typeof address) + ".");
    }
    const strip_address = stripHexPrefix(address).toLowerCase()
    const prefix = chainId != null ? (chainId.toString() + '0x') : ''
    const keccak_hash = sha3(prefix + strip_address).toString('hex')
    let output = '0x'

    for (let i = 0; i < strip_address.length; i++)
        output += parseInt(keccak_hash[i], 16) >= 8 ?
            strip_address[i].toUpperCase() :
            strip_address[i];
    return output
};

const encoder = toChecksumAddress


function checksummedHexDecoder(data: HexAddress): Buffer {
    const stripped = stripHexPrefix(data);
    return Buffer.from(stripHexPrefix(stripped), 'hex');
}


function decodeContenthash(encoded) {
  let decoded, protocolType, error
  if(!encoded || encoded === '0x'){
    return {}
  }
  if (encoded.error) {
    return { protocolType: null, decoded: encoded.error }
  }else if(encoded === false){
    return { protocolType: null, decoded: 'invalid value' }
  }
  if (encoded) {
    try {
      decoded = contentHash.decode(encoded)
      const codec = contentHash.getCodec(encoded)
      if (codec === 'ipfs-ns') {
        protocolType = 'ipfs'
      } else if (codec === 'ipns-ns') {
        protocolType = 'ipns'
      } else if (codec === 'swarm-ns') {
        protocolType = 'bzz'
      } else if (codec === 'onion') {
        protocolType = 'onion'
      } else if (codec === 'onion3') {
        protocolType = 'onion3'
      } else if (codec === 'skynet-ns') {
        protocolType = 'sia'
      } else {
        decoded = encoded
      }
    } catch (e) {
      error = e.message
    }
  }
  return { protocolType, decoded, error }
}


function getResolverContract({ address: HexAddress, provider: Web3Provider }): Contract {
  console.log('address', {address, provider})
  return new ethers.Contract(address, ResolverAbi, provider)
}

// globals

let provider: Web3Provider
let signer: JsonRpcSigner
let address: HexAddress = null
let account: HexAddress = null
let readOnly = false
let reloadOnAccountsChange

let resolverAddress: HexAddress = null

let ensContract: Contract = null
let resolverContract: Contract = null
let registrarContract: Contract = null
let controllerContract: Contract = null
let bulkRenewalContract: Contract = null

const emptyAddress: HexAddress = '0x0000000000000000000000000000000000000000'

// constants

const baseGasLimit = 500000;

const TLD = "eth";
const interfaces = {
  legacyRegistrar: "0x7ba18ba1",
  permanentRegistrar: "0x018fac06",
  permanentRegistrarWithConfig: "0xca27ac4c",
  baseRegistrar: "0x6ccb2df4",
  dnsRegistrar: "0x1aa2e641",
  bulkRenewal: "0x3150bfba",
};
const configs = {
  "0x4": {
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    resolverAddress: "0xd581f8C423408d08E8FDa4cEcDF4951D29867f89",
    registrarAddress: "0x09270d622cE1E2D2d53DA920EE9577dB83A167CB",
    reverseRegistrarAddress: "0x47FeB315728FeC50b2090035cEed0bE65065C14a",
  },
};

function getBufferedPrice(price: BigNumber): BigNumber {
  return price.mul(110).div(100);
}

const transferGasCost = 21000;

var ethereum = (window as any).ethereum as MetaMaskInpageProvider;

export class PNS {
  account: HexAddress;
  provider: Web3Provider;
  signer: JsonRpcSigner;

  /** 合约, 内部是动态类型... */
  ensContract: Contract;
  resolverContract: Contract;
  registrarContract: Contract;
  controllerContract: Contract;
  bulkRenewalContract: Contract;

  constructor() {
    if (window["ethereum"] == null) {
      console.error("without global `ethereum` interface, PNS will fall!");
    }
  }

  isValidDomain(name: string): boolean {
    return isValidDomain(name, { allowUnicode: false, subdomain: false }) && name.length < 64;
  }

  isConnected() {
    return ethereum.isConnected();
  }

  async loginAccount(): Promise<void> {
    if (typeof ethereum !== "undefined") {
      // 调用窗口, 登录账户
      await ethereum.request({ method: "eth_requestAccounts" });
    } else {
      throw new Error("cannot find a global `ethereum` object");
    }
  }

  getTLD() {
    return TLD;
  }

  /** 获取账号, 如果没有, 请求登录 */
  async getAccount(): Promise<HexAddress | void> {
    let accounts: HexAddress[] = await ethereum.request({ method: "eth_accounts" });
    let from = accounts[0];
    if (accounts.length === 0) {
      await this.loginAccount(); // try to connect
      let accounts = await ethereum.request({ method: "eth_accounts" });
      from = accounts[0];
    }
    this.account = from;
    return from;
  }

  async setup({ ensAddress }) {
    let accounts = await ethereum.request({ method: "eth_accounts" });
    this.account = accounts[0];
    if (!this.account) {
      return await this.loginAccount();
    }

    provider = this.provider = new ethers.providers.Web3Provider(ethereum as any);
    signer = this.signer = this.provider.getSigner();
    ensContract = this.ensContract = new ethers.Contract(ensAddress, EnsAbi, this.signer);

    resolverAddress = await this.ensContract.resolver(namehash("eth"));
    resolverContract = this.resolverContract = new ethers.Contract(resolverAddress, ResolverAbi, this.signer);

    let ethAddress = await this.ensContract.owner(namehash("eth"));
    registrarContract = this.registrarContract = new ethers.Contract(ethAddress, RegistrarAbi, this.signer);

    let controllerAddress = await this.resolverContract.interfaceImplementer(namehash("eth"), interfaces.permanentRegistrar);
    controllerContract = this.controllerContract = new ethers.Contract(controllerAddress, ETHRegistrarControllerAbi, this.signer);

    let bulkRenewalAddress = await this.resolverContract.interfaceImplementer(namehash("eth"), interfaces.bulkRenewal);
    bulkRenewalContract = this.bulkRenewalContract = new ethers.Contract(bulkRenewalAddress, BulkRenewalAbi, this.signer);

    return {
      provider: this.provider,
      signer: this.signer,
    };
  }

  getChainId() {
    return ethereum.chainId;
  }

  getChainConfig(): number {
    return configs[this.getChainId()];
  }

  getOwner(node: DomainString): Promise<HexAddress> {
    let namehashed = namehash(node);
    return ensContract.owner(namehashed);
  }


  async getAddress(name: DomainString): Promise<HexAddress> {
    const resolverAddr = await this.getResolver(name)
    return this.getEthAddressWithResolver(name, resolverAddr)
  }

  async getAddr(name: DomainString, key: string): HexAddress {
    const resolverAddr = await this.getResolver(name)
    if (parseInt(resolverAddr, 16) === 0) return emptyAddress
    return this.getAddrWithResolver(name, key, resolverAddr)
  }

  async getAddrWithResolver(name, key, resolverAddr): HexAddress {
    const namehash = getNamehash(name)
    try {
      const Resolver = this.resolverContract

      const coinType = 60
      // const { coinType, encoder } = formatsByName[key]
      const addr = await Resolver['addr(bytes32,uint256)'](namehash, coinType)
      if (addr === '0x') return emptyAddress

      // return encoder(Buffer.from(addr.slice(2), 'hex'))
      return addr
    } catch (e) {
      console.log(e)
      console.warn(
        'Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?'
      )
      return emptyAddress
    }
  }

  async getContent(name: DomainString) {
    const resolverAddr = await getResolver(name)
    return getContentWithResolver(name, resolverAddr)
  }

  async getContentWithResolver(name: DomainString, resolverAddr: HexAddress) {
    if (parseInt(resolverAddr, 16) === 0) {
      return emptyAddress
    }
    try {
      const namehash = getNamehash(name)
      const provider = await getProvider()
      const Resolver = getResolverContract({
        address: resolverAddr,
        provider
      })
      const contentHashSignature = utils
        .solidityKeccak256(['string'], ['contenthash(bytes32)'])
        .slice(0, 10)

      const isContentHashSupported = await Resolver.supportsInterface(
        contentHashSignature
      )

      if (isContentHashSupported) {
        const encoded = await Resolver.contenthash(namehash)
        const { protocolType, decoded, error } = decodeContenthash(encoded)
        if (error) {
          return {
            value: error,
            contentType: 'error'
          }
        }
        return {
          value: `${protocolType}://${decoded}`,
          contentType: 'contenthash'
        }
      } else {
        const value = await Resolver.content(namehash)
        return {
          value,
          contentType: 'oldcontent'
        }
      }
    } catch (e) {
      const message =
        'Error getting content on the resolver contract, are you sure the resolver address is a resolver contract?'
      console.warn(message, e)
      return { value: message, contentType: 'error' }
    }
  }

  async getText(name: DomainString, key: string): string {
    const resolverAddr = await getResolver(name)
    return getTextWithResolver(name, key, resolverAddr)
  }

  async getTextWithResolver(name: DomainString, key: string, resolverAddr: HexAddress) {
    if (parseInt(resolverAddr, 16) === 0) {
      return ''
    }
    const namehash = getNamehash(name)
    try {
      const provider = await getProvider()
      const Resolver = getResolverContract({
        address: resolverAddr,
        provider
      })
      const addr = await Resolver.text(namehash, key)
      return addr
    } catch (e) {
      console.warn(
        'Error getting text record on the resolver contract, are you sure the resolver address is a resolver contract?'
      )
      return ''
    }
  }

  async getName(address: HexAddress): string {
    const reverseNode = `${address.slice(2)}.addr.reverse`
    const resolverAddr = await getResolver(reverseNode)
    return getNameWithResolver(address, resolverAddr)
  }

  async getNameWithResolver(address: HexAddress, resolverAddr: HexAddress): string {
    const reverseNode = `${address.slice(2)}.addr.reverse`
    const reverseNamehash = getNamehash(reverseNode)
    if (parseInt(resolverAddr, 16) === 0) {
      return {
        name: null
      }
    }

    try {
      const provider = await getProvider()
      const Resolver = getResolverContract({
        address: resolverAddr,
        provider
      })
      const name = await Resolver.name(reverseNamehash)
      return {
        name
      }
    } catch (e) {
      console.log(`Error getting name for reverse record of ${address}`, e)
    }
  }


  async getResolverDetails(node) {
    try {
      const addrPromise = getAddress(node.name)
      const contentPromise = getContent(node.name)
      const [addr, content] = await Promise.all([addrPromise, contentPromise])
      return {
        ...node,
        addr,
        content: content.value,
        contentType: content.contentType
      }
    } catch (e) {
      return {
        ...node,
        addr: '0x0',
        content: '0x0',
        contentType: 'error'
      }
    }
  }

  async getDomainDetails(name) {
    const nameArray = name.split('.')
    const labelhash = getLabelhash(nameArray[0])
    const [owner, resolver] = await Promise.all([
      getOwner(name),
      getResolver(name)
    ])
    const node = {
      name,
      label: nameArray[0],
      labelhash,
      owner,
      resolver
    }

    const hasResolver = parseInt(node.resolver, 16) !== 0

    if (hasResolver) {
      return getResolverDetails(node)
    }

    return {
      ...node,
      addr: null,
      content: null
    }
  }


  // 一次性设置域名信息
  // function setRecord(bytes32 node, address owner, address resolver, uint64 ttl)
  // example:
  // pns.setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400)
  setRecord(node: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
    let namehashed = namehash(node);
    return this.ensContract.setRecord(namehashed, newOwner, resolver, ttl);
  }

  // 一次性设置域名信息
  // function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl)
  // example:
  // pns.setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400)
  setSubnodeRecord(node: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
    let namehashed = namehash(node);
    label = "0x" + sha3(label);
    return this.ensContract.setSubnodeRecord(namehashed, label, newOwner, resolver, ttl);
  }

  // 设置子域名的所有者
  // function setOwner(bytes32 node, address owner)
  // example:
  // pns.setOwner('hero.eth', '0x123456789')
  setOwner(node: DomainString, newOwner: HexAddress): Promise<any> {
    let namehashed = namehash(node);
    return this.ensContract.setOwner(namehashed, newOwner);
  }

  // 设置子域名的所有者
  // function setSubnodeOwner(bytes32 node, bytes32 label, address owner)
  // example:
  // pns.setSubnodeOwner('hero.eth', 'sub', '0x123456789')
  setSubnodeOwner(node: DomainString, label: string, newOwner: HexAddress): Promise<any> {
    let namehashed = namehash(node);
    label = "0x" + sha3(label);
    return this.ensContract.setSubnodeOwner(namehashed, label, newOwner);
  }

  // 设置域名 resolver 参数，表示域名的解析器
  // function setResolver(bytes32 node, address resolver)
  // example:
  // pns.setResolver('hero.eth', '0x123456789')
  setResolver(node: DomainString, resolver: HexAddress): Promise<any> {
    let namehashed = namehash(node);
    return this.ensContract.setResolver(namehashed, resolver);
  }

  // 设置域名 ttl 参数，表示域名可以在本地缓存的时间
  // function setTTL(bytes32 node, uint64 ttl)
  // example:
  // pns.setTTL('hero.eth', 3600)
  setTTL(node: DomainString, ttl: number): Promise<void> {
    let namehashed = namehash(node);
    return this.ensContract.setTTL(namehashed, ttl);
  }

  // 获得域名 resolver 参数，由用户设置，表示域名的解析器
  // function getResolver(bytes32 node) returns (address)
  // example:
  // pns.getResolver('hero.eth')
  getResolver(node: DomainString): Promise<HexAddress> {
    let namehashed = namehash(node);
    return this.ensContract.resolver(namehashed);
  }

  // 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
  // function getTTL(bytes32 node) returns (uint64)
  // example:
  // pns.getTTL('hero.eth')
  getTTL(node: DomainString): Promise<number> {
    let namehashed = namehash(node);
    return this.ensContract.ttl(namehashed);
  }

  // 获得 MinimumCommitmentAge 参数，忽略
  async getMinimumCommitmentAge(): Promise<number> {
    const controllerContract = this.controllerContract;
    return controllerContract.minCommitmentAge();
  }

  // 获得 getMaximumCommitmentAge 参数，忽略
  async getMaximumCommitmentAge(): Promise<number> {
    const controllerContract = this.controllerContract;
    return controllerContract.maxCommitmentAge();
  }

  // 获得当前域名价格
  // function getRentPrice(string name, uint duration) returns (uint)
  // example:
  // pns.getRentPrice('hero', 86400*365)
  async getRentPrice(name: DomainString, duration: number): Promise<BigNumber> {
    const controllerContract = this.controllerContract;
    let price = await controllerContract.rentPrice(name, duration);
    return price;
  }

  async getRentPrices(labels: string[], duration: number): Promise<BigNumber> {
    const pricesArray = await Promise.all(
      labels.map((label) => {
        return this.getRentPrice(label, duration);
      })
    );
    return pricesArray.reduce((a: any, c) => a.add(c));
  }

  async makeCommitment(name: DomainString, owner: HexAddress, secret = ""): Promise<HexAddress> {
    const controllerContract = this.controllerContract;
    const resolverAddr = await this.owner("resolver.eth");
    secret = namehash("eth"); // todo: store user
    if (parseInt(resolverAddr, 16) === 0) {
      return controllerContract.makeCommitment(name, owner, secret);
    } else {
      return controllerContract.makeCommitmentWithConfig(name, owner, secret, resolverAddr, this.account);
    }
  }

  async checkCommitment(label: DomainString, secret = "") {
    const account = this.account;
    const commitment = await this.makeCommitment(label, account, secret);
    return await this.controllerContract.commitments(commitment);
  }

  // 开始注册域名（第一步）
  async commit(label: DomainString, secret = "") {
    const account = this.account;
    const commitment = await this.makeCommitment(label, account, secret);

    return this.controllerContract.commit(commitment);
  }

  // 域名注册（第二步）
  async register(label: DomainString, duration: number, secret = ""): Promise<void> {
    const controllerContract = this.controllerContract;
    const account = this.account;
    const price = await this.getRentPrice(label, duration);
    const priceWithBuffer = getBufferedPrice(price);
    const resolverAddr = await this.owner("resolver.eth");
    secret = namehash("eth");
    if (parseInt(resolverAddr, 16) === 0) {
      return controllerContract.register(label, account, duration, secret, { value: priceWithBuffer, gasLimit });
    } else {
      return controllerContract.registerWithConfig(label, account, duration, secret, resolverAddr, account, { value: priceWithBuffer, gasLimit });
    }
  }
}


const api_url_base = "https://pns-engine.vercel.app/api/handler"

export async function signLoginMessage(): Promise<string>  {
  let signer = provider.getSigner();

  let content = "PNS Login"
  return signer.signMessage(content);
}

export async function getLoginToken(sig: string): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'login',
      sig: sig
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

export async function listFav(token: string, account: HexAddress): Promise<any> {
  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'listFav',
      token: token,
      account: account,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

export async function createFav(token: string, account: HexAddress, domain: DomainString): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'createFav',
      token: token,
      account: account,
      domain: domain,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

export async function deleteFav(token: string, id: string): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'deleteFav',
      token: token,
      ref: id,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

export async function listSubdomain(token: string, account: HexAddress): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'listSubdomain',
      token: token,
      account: account,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}
export async function createSubdomain(token: string, account: HexAddress, domain: DomainString, data: string): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'createSubdomain',
      token: token,
      account: account,
      domain: domain,
      data: data,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

export async function deleteSubdomain(token: string, id: string): Promise<any> {

  return fetch(api_url_base, {
    method: 'POST',
    body: JSON.stringify({
      action: 'deleteSubdomain',
      token: token,
      ref: id,
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }
  )}).then(res => res.json())
  
}

