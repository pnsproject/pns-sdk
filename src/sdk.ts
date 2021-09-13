/// <reference path="./typings.d.ts" />

import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from 'js-sha3';
import { Buffer as Buffer } from "buffer/";

import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";
import { default as domainChecker } from "is-valid-domain";

import { HexAddress, DomainString, ContentType } from "./types";
import { EnsAbi, RegistrarAbi, ResolverAbi } from "./contracts";

import Web3Modal from "web3modal";


export function sha3 (data: string) {
  return "0x" + keccak_256(data)
}

export function getNamehash (name: string) {
  let node = '0000000000000000000000000000000000000000000000000000000000000000'

  if (name) {
    let labels = name.split('.')

    for(let i = labels.length - 1; i >= 0; i--) {
      let labelSha = keccak_256(labels[i])
      node = keccak_256(Buffer.from(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}

export const stripHexPrefix = (str: HexAddress): string => {
  return str.slice(0, 2) === "0x" ? str.slice(2) : str;
};

export const toChecksumAddress = (address: HexAddress): HexAddress => {
  if (typeof address !== "string") {
    throw new Error("stripHexPrefix param must be type 'string', is currently type " + typeof address + ".");
  }
  const strip_address = stripHexPrefix(address).toLowerCase();
  const keccak_hash = keccak_256(strip_address).toString();
  let output = "0x";

  for (let i = 0; i < strip_address.length; i++) output += parseInt(keccak_hash[i], 16) >= 8 ? strip_address[i].toUpperCase() : strip_address[i];
  return output;
};


function getBufferedPrice(price: BigNumber): BigNumber {
  return BigNumber.from(price).mul(1);
}

const emptyAddress = "0x0000000000000000000000000000000000000000";
const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";

const tld = "dot";
const DAYS = 24 * 60 * 60;
const INFURA_URL = "https://rinkeby.infura.io/v3/75e0d27975114086be0463cf2597549e";
const api_url_base = "https://pns-engine.vercel.app/api/handler";

let provider: Web3Provider;
let signer: any;
let account: string;

let ens: any;
let resolver: any;
let registrar: any;

let ensAddr: string;
let resolverAddr: string;
let registrarAddr: string;

let coinTypes: any = {
  BTC: 0,
  ETH: 60,
  DOT: 354,
  KSM: 434,
};

export async function setProvider(providerOpt: any) {
  if (provider && account) return;

  if (providerOpt) {
    provider = providerOpt
    signer = await provider.getSigner();
    account = await signer.getAddress();
  } else if (typeof (window as any).ethereum !== "undefined") {
    // 调用窗口, 登录账户
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as Web3Provider;
    signer = await provider.getSigner();
    account = await signer.getAddress();
  } else {
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.JsonRpcProvider(INFURA_URL) as Web3Provider;
    signer = null;
    account = "0x0";
  }

  console.log("network", await provider.getNetwork());
  return;
}


export const ContractAddrs = {
  ens: "0xcb3B1D40bbAde960150400fe99198e7939d998f0",
  resolver: "0xc8ddD10a9E9bAFA6aD58C5fbaFEB65E8a48b21Ff",
  registrar: "0xb6c763b610efCb20E8046B39624269CcB73721b0"
};

export async function setup(ensAddress?: string, resolverAddress?: string, registrarAddress?: string, providerOpt?: Web3Provider) {
  if (provider && ens) {
    return {
      provider,
      signer,
      ens,
      resolver,
      registrar,
    };
  }

  await setProvider(providerOpt);
  console.log("init sdk");

  ensAddress = ensAddress || ContractAddrs.ens;
  resolverAddress = resolverAddress || ContractAddrs.resolver;
  registrarAddress = registrarAddress || ContractAddrs.registrar;

  if (signer) {
    ens = new ethers.Contract(ensAddress, EnsAbi, signer);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, signer);
    registrar = new ethers.Contract(registrarAddress, RegistrarAbi, signer);
  } else {
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

export async function setupByContract(ensContract: any, resolverContract: any, registrarContract: string, providerOpt: Web3Provider) {
  if (provider && ens) {
    return {
      provider,
      signer,
      ens,
      resolver,
      registrar,
    };
  }

  await setProvider(providerOpt);
  console.log("init sdk");

  ens = ensContract
  resolver = resolverContract
  registrar = registrarContract

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

export function getSigner(): JsonRpcSigner {
  return signer;
}

export function getAccount(): string {
  return account;
}

export async function createWeb3Modal(): Promise<Web3Provider> {
  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const web3provider = await web3Modal.connect();
  let pvd = new ethers.providers.Web3Provider(web3provider) as Web3Provider;
  return pvd
}

export async function switchChain(): Promise<any> {
  let chain: any = {
    "name": "Moonbeam Testnet",
    "chain": "moon",
    "network": "mainnet",
    "rpc": [
      "http://moonbeam.pns.link:9933"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Moonbeam",
      "symbol": "moon",
      "decimals": 18
    },
    "infoURL": "",
    "shortName": "moonbeam",
    "chainId": 1281,
    "networkId": 1
  }

  const params = {
    chainId: ethers.utils.hexlify(chain.chainId), // A 0x-prefixed hexadecimal string
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol, // 2-6 characters long
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [ chain.infoURL ]
  };

  return await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [params, account],
  })
}

export async function getMinCommitmentAge(): Promise<BigNumber> {
  return registrar.minCommitmentAge();
}

export async function getMaximumCommitmentAge(): Promise<BigNumber> {
  return registrar.maxCommitmentAge();
}

/** 获取域名的当前所有者 */
export async function getOwner(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return ens.owner(namehash);
}

/** 获取域名的解析器合约 */
export function getResolver(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return ens.resolver(namehash);
}

export function getTTL(name: DomainString): Promise<number> {
  let namehash = getNamehash(name);
  return ens.ttl(namehash);
}

/** 获取域名的解析地址 */
export async function getAddr(name: DomainString, key: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  // const resolverAddr = await ensContract.resolver(namehash)

  try {
    let coinType = coinTypes[key];
    const addr = await resolver.addr(namehash, coinType);
    if (addr === "0x") return emptyAddress;

    // return encoder(Buffer.from(addr.slice(2), 'hex'))
    return addr;
  } catch (e) {
    console.log(e);
    console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
    return emptyAddress;
  }
}

/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 name) returns (uint64)
 * getTTL('hero.eth') */
export function getText(name: DomainString, key: string): Promise<number> {
  let namehash = getNamehash(name);
  return resolver.text(namehash, key);
}

/** 获得域名的IPFS内容地址 */
export async function getContent(name: DomainString): Promise<ContentType> {
  try {
    const namehash = getNamehash(name);
    const encoded = await resolver.contenthash(namehash);
    return {
      value: `ipfs://${ethers.utils.base58.encode(encoded)}`,
      contentType: "contenthash",
    };
  } catch (e) {
    const message = "Error getting content on the resolver contract, are you sure the resolver address is a resolver contract?";
    console.warn(message, e);
    return { value: "", contentType: "error" };
  }
}

export type DomainDetails = {
  name: string;
  label: string;
  labelhash: string;
  owner: string;
  ttl: string;
  nameResolver: string;

  content: string;
  contentType?: string;

  addrs: {
    key: string;
    value: string;
  }[];
  textRecords: {
    key: string;
    value: string;
  }[];
};

function buildKeyValueObjects(keys: any, values: any) {
  return values.map((record: any, i: any) => ({
    key: keys[i],
    value: record,
  }));
}

function getLabelhash(rawlabel: string): HexAddress {
  if (rawlabel === "[root]") {
    return "";
  }

  return rawlabel.startsWith("[") && rawlabel.endsWith("]") && rawlabel.length === 66 ? "0x" + rawlabel.slice(1, -1) : "0x" + keccak_256(rawlabel);
}

function decodeLabelhash(hash: string): string {
  if (!(hash.startsWith("[") && hash.endsWith("]") && hash.length === 66)) {
    throw Error("Expected encoded labelhash to start and end with square brackets");
  }
  return `${hash.slice(1, -1)}`;
}

/** 获得域名详细信息 */
export async function getDomainDetails(name: DomainString): Promise<DomainDetails> {
  const nameArray = name.split(".");
  const labelhash = getLabelhash(nameArray[0]);
  const nameResolver = await getResolver(name);
  const ttl = (await getTTL(name)).toString();
  const owner = await getOwner(name);
  const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];

  const promises = TEXT_RECORD_KEYS.map((key) => getText(name, key));
  const records = await Promise.all(promises);
  let textRecords = buildKeyValueObjects(TEXT_RECORD_KEYS, records);

  const node = {
    name,
    label: nameArray[0],
    labelhash,
    owner,
    nameResolver,
    ttl,
    textRecords,
  };

  const content = await getContent(name);
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

export async function getRentPrice(name: DomainString, duration: number): Promise<BigNumber> {
  let result: BigNumber = await registrar.rentPrice(name, duration);
  return result;
}

export async function nameExpires(label: DomainString): Promise<BigNumber> {
  label = "0x" + keccak_256(label) || "0x0";
  return registrar.nameExpires(label);
}

export async function available(label: DomainString): Promise<boolean> {
  label = "0x" + keccak_256(label) || "0x0";
  return registrar.available(label);
}

/** 计算commitment */
export async function makeCommitment(label: DomainString, account: HexAddress): Promise<HexAddress> {
  let secret = getNamehash("dot");
  return registrar.makeCommitment(label, account, secret);
}

/** 开始注册域名（第一步），这一步是提交commitment */
export async function commit(label: DomainString, account: string) {
  const commitment = await makeCommitment(label, account);
  return registrar.commit(commitment);
}

/** 域名注册（第二步），完成域名注册 */
export async function register(
  label: DomainString,
  account: string,
  duration: number
): Promise<{
  /** 额外的等待请求 */
  wait: () => Promise<void>;
}> {
  const price = await getRentPrice(label, duration);
  // console.log('price', price.toString())

  // const resolverAddr = await getowner("resolver.dot");
  // let secret = getNamehash("dot");

  return registrar.register(label, account, duration, { value: price, gasLimit: 500000 });
}

export async function renew(label: DomainString, duration: number): Promise<void> {
  const price = await getRentPrice(label, duration);

  return registrar.renew(label, duration, { value: price, gasLimit: 500000 });
}

/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export function setResolver(name: DomainString, resolver?: HexAddress): Promise<any> {
  let namehash = getNamehash(name);
  resolver = resolver || resolverAddr
  return ens.setResolver(namehash, resolver);
}

/** 设置域名的所有者
 * function setOwner(bytes32 name, address owner)
 * setOwner('hero.eth', '0x123456789') */
export function setOwner(
  name: DomainString,
  newOwner: HexAddress
): Promise<{
  wait: () => Promise<void>;
}> {
  let namehash = getNamehash(name);
  return ens.setOwner(namehash, newOwner);
}

/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 name, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export function setTTL(name: DomainString, ttl: number): Promise<void> {
  let namehash = getNamehash(name);
  return ens.setTTL(namehash, ttl);
}

/** 设置域名的解析地址 */
export async function setAddr(name: DomainString, key: string, value: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  // const resolverAddr = await ensContract.resolver(namehash)

  try {
    let coinType = coinTypes[key];
    const addr = await resolver.setAddr(namehash, coinType, value);
    if (addr === "0x") return emptyAddress;
    return addr;
  } catch (e) {
    console.log(e);
    console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
    return emptyAddress;
  }
}

export function setText(name: DomainString, key: string, value: string): Promise<void> {
  let namehash = getNamehash(name);
  return resolver.setText(namehash, key, value);
}

export function setContent(name: DomainString, value: string): Promise<void> {
  let namehash = getNamehash(name);
  return resolver.setContenthash(namehash, value);
}

/** 一次性设置域名信息
 * function setRecord(bytes32 name, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setRecord(name: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(name);
  return ens.setRecord(namehash, newOwner, resolver, ttl);
}

/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export function setSubnodeOwner(name: DomainString, label: string, newOwner: HexAddress): Promise<any> {
  let namehash = getNamehash(name);
  label = "0x" + keccak_256(label) || "0x0";
  return ens.setSubnodeOwner(namehash, label, newOwner);
}

/** 一次性设置域名信息
 * function setSubnodeRecord(bytes32 name, bytes32 label, address owner, address resolver, uint64 ttl)
 * setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setSubnodeRecord(name: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(name);
  label = "0x" + keccak_256(label) || "0x0";
  return ens.setSubnodeRecord(namehash, label, newOwner, resolver, ttl);
}

/** 根据名字设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, string subname, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export function setSubnameOwner(name: DomainString, subname: string, newOwner: HexAddress): Promise<any> {
  let namehash = getNamehash(name);
  return ens.setSubnameOwner(namehash, subname, newOwner);
}

/** 根据名字一次性设置域名信息
 * function setSubnameRecord(bytes32 name, string subname, address owner, address resolver, uint64 ttl)
 * setSubnameRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setSubnameRecord(name: DomainString, subname: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(name);
  return ens.setSubnameRecord(namehash, subname, newOwner, resolver, ttl);
}

export function matchProtocol(text: string): RegExpMatchArray | null {
  return text.match(/^(ipfs|sia|ipns|bzz|onion|onion3):\/\/(.*)/) || text.match(/\/(ipfs)\/(.*)/) || text.match(/\/(ipns)\/(.*)/);
}

export function getProtocolType(encoded: string): {
  protocolType: string;
  decoded: string;
} {
  let protocolType: string = 'ipfs://', decoded: string = '';
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
  } catch (e) {
    console.log(e);
    return {
      protocolType,
      decoded,
    };
  }
}

/** 解析IPFS地址 */
export function decodeIpfsUrl(url: string): string {
  let data = getProtocolType(url);
  return "0x" + Buffer.from(ethers.utils.base58.decode(data.decoded)).toString("hex");
}

export async function setDomainDetails(name: string, textRecords: any, addrs: any, content: string) {
  await Promise.all(
    textRecords.map(async (item: any) => {
      if (item.value && item.value !== "") {
        await setText(name, item.key, item.value);
      }
    })
  );

  await Promise.all(
    addrs.map(async (item: any) => {
      if (item.value && item.value !== "") {
        await setAddr(name, item.key, item.value);
      }
    })
  );

  if (content && content !== "") {
    await setContent(name, content);
  }
}

/** 目前使用的都都是基于 eth 的域名, 后续扩展再拆分函数 */
export function isValidDomain(rawName: string): boolean {
  let name = rawName.endsWith("." + tld) ? rawName : `${rawName}.${tld}`;
  return name.length > 3 && name.length < 64 && domainChecker(name, { allowUnicode: false, subdomain: false });
}

/** 用于服务器的 token */
let serverJwtToken: string = null;

/** 做一些检查 */
let getJwtToken = (): string => {
  if (serverJwtToken != null) {
    return serverJwtToken;
  } else {
    console.error("token 为空, 需要先登录获取 token");
    return null;
  }
};

//////////////////////
const secret = "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF";
// const api_url_base = "http://localhost:5000/api/handler";

export function getTld() {
  return "dot";
}

export function suffixTld(label: string): DomainString {
  return label.replace(".dot", "") + ".dot";
}

/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export function setDefaultResolver(name: DomainString): Promise<any> {
  let namehash = getNamehash(name);
  return ens.setResolver(namehash, resolverAddr);
}


// server api

/** 获取用户登录的签名token */
export async function signLoginMessage(): Promise<string> {
  let signer = provider.getSigner();

  let content = "PNS Login";
  return signer.signMessage(content);
}

/** 通过用户登录的签名token登录 */
export async function getLoginToken(sig: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      sig: sig,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

export async function autoLogin(): Promise<string> {
  console.log("auto login");

  if (!(window as any).ethereum) {
    window.alert("Please install MetaMask first.");
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.JsonRpcProvider(INFURA_URL) as Web3Provider;
    signer = null;
    account = "0x0";
    return;
  }

  if (!provider) {
    try {
      let web3 = (window as any).ethereum;
      await web3.enable();

      provider = new ethers.providers.Web3Provider(web3) as Web3Provider;
      signer = await provider.getSigner();
      account = await signer.getAddress();
    } catch (error) {
      window.alert("You need to allow MetaMask.");
      return;
    }
  }

  await setup();
  let hasLocalstorage = typeof (window as any).localStorage !== "undefined";

  if (hasLocalstorage && localStorage.getItem("pns-jwt")) {
    console.log("jwt loaded");
    let jwt = localStorage.getItem("pns-jwt");

    // 在类库当中缓存 token
    serverJwtToken = jwt;

    return jwt;
  } else {
    let signed = await signLoginMessage();
    let { jwt } = await getLoginToken(signed);
    console.log("get new jwt");

    // 在类库当中缓存 token
    serverJwtToken = jwt;

    if (hasLocalstorage) {
      localStorage.setItem("pns-jwt", jwt);
    }
    return jwt;
  }
}

export async function tryLogin(): Promise<string> {
  await setup();
  let hasLocalstorage = typeof (window as any).localStorage !== "undefined";

  if (hasLocalstorage && localStorage.getItem("pns-jwt")) {
    console.log("jwt loaded");
    let jwt = localStorage.getItem("pns-jwt");

    // 在类库当中缓存 token
    console.info("jwtToken loaded");
    serverJwtToken = jwt;

    return jwt;
  } else {
    let signed = await signLoginMessage();
    let { jwt } = await getLoginToken(signed);
    console.log("get new jwt");

    // 在类库当中缓存 token
    console.info("jwtToken loaded");
    serverJwtToken = jwt;

    if (hasLocalstorage) {
      localStorage.setItem("pns-jwt", jwt);
    }
    return jwt;
  }
}

/** 列出用户关注的域名列表 */
export async function listFav(account: HexAddress): Promise<
  {
    domain: string;
    id: string;
    account: HexAddress;
  }[]
> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "listFav",
      token: getJwtToken(),
      account: account,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 创建用户关注的域名 */
export async function createFav(account: HexAddress, domain: DomainString): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "createFav",
      token: getJwtToken(),
      account: account,
      domain: domain,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 取消用户关注的域名 */
export async function deleteFav(id: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteFav",
      token: getJwtToken(),
      ref: id,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .catch((err) => "err");
}

/** 列出用户的子域名列表 */
export async function listSubdomain(account: HexAddress): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "listSubdomain",
      token: getJwtToken(),
      account: account,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 创建用户的子域名 */
export async function createSubdomain(account: HexAddress, domain: DomainString, data: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "createSubdomain",
      token: getJwtToken(),
      account: account,
      domain: domain,
      data: data,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 删除用户的子域名 */
export async function deleteSubdomain(id: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteSubdomain",
      token: getJwtToken(),
      ref: id,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 列出用户的域名列表 */
export async function listDomain(account: HexAddress): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "listDomain",
      token: getJwtToken(),
      account: account,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 创建用户的域名 */
export async function createDomain(account: HexAddress, domain: DomainString, data: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "createDomain",
      token: getJwtToken(),
      account: account,
      domain: domain,
      data: data,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 删除用户的域名 */
export async function deleteDomain(id: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteDomain",
      token: getJwtToken(),
      ref: id,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}



let urlbase = "https://trusted-quagga-17.hasura.app/v1/graphql"

/** 列出用户的域名列表 */
async function listAccountDomains(account: HexAddress): Promise<any> {
  let query = "{\"query\":\"{\\n  domains(order_by: {name: asc}, where: {owner: {_eq: \\\""+ account +"\\\"}}) {\\n    id\\n    name\\n    owner\\n    expires\\n  }\\n}\",\"variables\":null}"

  let resp = await fetch(urlbase, {
    "headers": {
      "content-type": "application/json",
    },
    "body": query,
    "method": "POST",
  })
  resp = await resp.json()
  return resp.data
}

