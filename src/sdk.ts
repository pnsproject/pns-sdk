import { ethers, Signer, BigNumber } from "ethers";
import { ResolverAbi, ControllerAbi, PnsAbi } from "./abi";
import { keccak_256 } from 'js-sha3';
import { Buffer as Buffer } from "buffer/";
import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider"
import { Signer as Web3Signer } from "@ethersproject/abstract-signer"

export type HexAddress = string;

export type DomainString = string;

export interface ContentType {
  value: string;
  contentType: string;
}

declare abstract class Web3Provider extends AbstractWeb3Provider {
  abstract getSigner(): Promise<Web3Signer>;
}

export type DomainDetails = {
  name: string;
  label: string;
  labelhash: string;
  owner: string;
  // ttl: string;
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

export const formatEther = ethers.utils.formatEther


let provider: Web3Provider;
let signer: Web3Signer;
let account: string;
let networkId: number;

let pns: any;
let resolver: any;
let registrar: any;

let pnsAddr: string;
let resolverAddr: string;
let registrarAddr: string;

let coinTypes: any = {
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


interface IContractAddrs {
  pns: string;
  resolver: string;
  controller: string;
}

interface IContractAddrsMap {
  [index: number]: IContractAddrs;
}


export const ContractAddrMap: IContractAddrsMap = {
  43113: {
    pns: "0x17Cf83bBCE053c264626cD46FE312368f0433127",
    resolver: "0xB1FaceBD0bA48B66fc5096CB6609df2C0B4199E1",
    controller: "0x01Eee6B2DC48810488B781F1Cdf0b4b2D73f2C1B"
  },
  1287: {
    pns: "0x04acC2f242D197f929448a81e5a927Aaa969c837",
    resolver: "0xfd6a62730c17Cc3a842963F70c95Be2b77DE0C90",
    controller: "0x64f58DaBFbAa801F247429656cD37d16231890De"
  },
  4: {
    pns: "0xD436ee017DD85921f4b83dc9f190aD683921b0A9",
    resolver: "0x2541c5365A02e4D5cf4d05Bc2982a6AD4348512E",
    controller: "0x04f675fC7D9D514c01318A751CC10662eD18606a"
  }
}

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


export async function switchChain(chainId: number): Promise<any> {
  let chains: any = {
    43113: {
      "name": "Avalanche Fuji Testnet",
      "chain": "AVAX",
      "network": "testnet",
      "rpc": [
        "https://api.avax-test.network/ext/bc/C/rpc"
      ],
      "faucets": [
        "https://faucet.avax-test.network/"
      ],
      "nativeCurrency": {
        "name": "Avalanche",
        "symbol": "AVAX",
        "decimals": 18
      },
      "infoURL": "https://cchain.explorer.avax-test.network",
      "shortName": "Fuji",
      "chainId": 43113,
      "networkId": 1
    },
    1287: {
      "name": "Moonbase Alpha",
      "chain": "MOON",
      "network": "moonbase",
      "rpc": [
        "https://rpc.testnet.moonbeam.network",
        "wss://wss.testnet.moonbeam.network"
      ],
      "faucets": [],
      "nativeCurrency": {
        "name": "Dev",
        "symbol": "DEV",
        "decimals": 18
      },
      "infoURL": "https://docs.moonbeam.network/networks/testnet/",
      "shortName": "mbase",
      "chainId": 1287,
      "networkId": 1287
    }
  }

  let chain: any = chains[chainId]

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

  return await (window as any).ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [params, account],
  })
}

export async function setProvider(providerOpt?: Web3Provider) {
  if (!!providerOpt) {
    provider = providerOpt;
  } else if (!!window && typeof (window as any).ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as any;
  } else {
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.JsonRpcProvider(INFURA_URL) as any;
    account = "0x0";
  }
  networkId = (await provider.getNetwork()).chainId;
  console.log("network", networkId);
  return;
}

export async function setup(pnsAddress?: string, resolverAddress?: string, controllerAddress?: string, providerOpt?: Web3Provider) {
  if (provider && pns && !providerOpt) {
    return {
      provider,
      signer,
      pns,
      resolver,
      registrar,
    };
  }

  await setProvider(providerOpt);
  console.log("set provider");

  let addrMap = ContractAddrMap[networkId]

  console.log('addrs', addrMap)

  pnsAddress = pnsAddress || addrMap.pns;
  resolverAddress = resolverAddress || addrMap.resolver;
  controllerAddress = controllerAddress || addrMap.controller;

  if (signer) {
    pns = new ethers.Contract(pnsAddress, PnsAbi, signer);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, signer);
    registrar = new ethers.Contract(controllerAddress, ControllerAbi, signer);
  } else {
    pns = new ethers.Contract(pnsAddress, PnsAbi, provider);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, provider);
    registrar = new ethers.Contract(controllerAddress, ControllerAbi, provider);
  }

  pnsAddr = pnsAddress;
  resolverAddr = resolverAddress;

  return {
    provider,
    signer,
    pns,
    resolver,
    registrar,
  };
}

export async function setupByContract(pnsContract: any, resolverContract: any, registrarContract: string, providerOpt: Web3Provider) {
  await setProvider(providerOpt);
  console.log("set provider");

  pns = pnsContract
  resolver = resolverContract
  registrar = registrarContract

  pnsAddr = pns.address;
  resolverAddr = resolver.address;

  return {
    provider,
    signer,
    pns,
    resolver,
    registrar,
  };
}

export function getProvider(): Web3Provider {
  return provider;
}

export function getSigner(): Web3Signer {
  return signer;
}

export function getAccount(): string {
  return account;
}

/** 获取域名的当前所有者 */
export async function getOwner(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  if (await pns.exists(namehash)) {
    return pns.ownerOf(namehash);
  } else {
    return emptyAddress;
  }
}

/** 获取域名的当前所有者 */
export async function ownerOf(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.ownerOf(namehash);
}

/** 获取域名的当前所有者 */
export async function exists(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.exists(namehash);
}

/** 获取域名的解析器合约 */
export function getResolver(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.resolver(namehash);
}

export async function addKey(key: string): Promise<void> {
  return await resolver.addKey(key)
}

export async function setKey(name: DomainString, key: string, value: string): Promise<void> {
  const namehash = getNamehash(name);
  await resolver.set(key, value, namehash)
}

export async function getKey(name: DomainString, key: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  return await resolver.get(key, namehash)
}


/** 获取域名的解析地址 */
export async function getAddr(name: DomainString, key: string): Promise<HexAddress> {
  const namehash = getNamehash(name);

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
  return resolver.get("text."+key, namehash);
}

/** 获得域名的IPFS内容地址 */
export async function getContent(name: DomainString): Promise<ContentType> {
  const namehash = getNamehash(name);
  const encoded = await resolver.get("contenthash", namehash);
  // todo
  return {
    value: `ipfs://${ethers.utils.base58.encode(encoded)}`,
    contentType: "contenthash",
  };
}

function buildKeyValueObjects(keys: any, values: any) {
  return values.map((record: any, i: any) => ({
    key: keys[i],
    value: record,
  }));
}

export function getLabelhash(rawlabel: string): HexAddress {
  if (rawlabel === "[root]") {
    return "";
  }

  return rawlabel.startsWith("[") && rawlabel.endsWith("]") && rawlabel.length === 66 ? "0x" + rawlabel.slice(1, -1) : "0x" + keccak_256(rawlabel);
}

function decodeLabelhash(hash: string): string {
  if (!(hash.startsWith("[") && hash.endsWith("]") && hash.length === 66)) {
    throw Error("Expected encoded labelhash in [hash] form");
  }
  return `${hash.slice(1, -1)}`;
}

/** 获得域名详细信息 */
export async function getDomainDetails(name: DomainString): Promise<DomainDetails> {
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

export async function totalRegisterPrice(name: DomainString, duration: number): Promise<BigNumber> {
  let result: BigNumber = await registrar.totalRegisterPrice(name, duration);
  return result;
}

export async function rentPrice(name: DomainString, duration: number): Promise<BigNumber> {
  let result: BigNumber = await registrar.rentPrice(name, duration);
  return result;
}

export async function nameExpires(label: DomainString): Promise<BigNumber> {
  // label = "0x" + keccak_256(label) || "0x0";
  return registrar.nameExpires(getNamehash(label));
}

export async function available(label: DomainString): Promise<boolean> {
  // label = "0x" + keccak_256(label) || "0x0";
  return registrar.available(getNamehash(label));
}


/** 域名注册 */
export async function register(label: DomainString, account: string, duration: number ): Promise<{ wait: () => Promise<void>; }> {
  const price = await totalRegisterPrice(label, duration);

  return registrar.nameRegister(label, account, duration, { value: price, gasLimit: 500000 });
}

export async function controllerRoot(): Promise<{ wait: () => Promise<void>; }> {
  return registrar.root();
}

export async function mintRedeem(start: number, end: number ): Promise<{ wait: () => Promise<void>; }> {
  return registrar.mintRedeem(start, end);
}

export async function nameRedeemAny(label: DomainString, account: string, duration: number, nonce: number, code: string ): Promise<{ wait: () => Promise<void>; }> {
  return registrar.nameRedeemAny(label, account, duration, nonce, code);
}


function encodeNameMsg(name: string, duration: number, nonce: number): Uint8Array {
  let durationEncoded = ethers.utils.defaultAbiCoder.encode([ "uint" ], [ duration ]).slice(2)
  let durationBuffer = Buffer.from(durationEncoded, "hex")

  let nonceEncoded = ethers.utils.defaultAbiCoder.encode([ "uint" ], [ nonce ]).slice(2)
  let nonceBuffer = Buffer.from(nonceEncoded, "hex")

  let encodeName = Buffer.from(name.slice(2), "hex")
  return Buffer.concat([encodeName, durationBuffer, nonceBuffer])
}

function encodeMsg(duration: number, nonce: number): Uint8Array {
  let durationEncoded = ethers.utils.defaultAbiCoder.encode([ "uint" ], [ duration ]).slice(2)
  let durationBuffer = Buffer.from(durationEncoded, "hex")

  let nonceEncoded = ethers.utils.defaultAbiCoder.encode([ "uint" ], [ nonce ]).slice(2)
  let nonceBuffer = Buffer.from(nonceEncoded, "hex")

  return Buffer.concat([durationBuffer, nonceBuffer])
}

function hashMsg(data: Uint8Array): Uint8Array {
  let hashed = '0x' + keccak_256(data)
  return ethers.utils.arrayify(hashed)
}


export async function generateRedeemCode(duration: number, nonce: number ): Promise<string> {
  let hashedMsg = hashMsg(encodeMsg(duration, nonce))
  let signer = getSigner()
  return signer.signMessage(hashedMsg)
}

export async function renew(label: DomainString, duration: number): Promise<void> {
  const price = await rentPrice(label, duration);

  return registrar.renew(label, duration, { value: price, gasLimit: 500000 });
}

/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export function setResolver(name: DomainString, resolver?: HexAddress): Promise<any> {
  name = suffixTld(name)
  let namehash = getNamehash(name);
  resolver = resolver || resolverAddr
  return pns.setResolver(namehash, resolver);
}

/** 设置域名的所有者
 * function setOwner(bytes32 name, address owner)
 * setOwner('hero.eth', '0x123456789') */
export async function setOwner(
  name: DomainString,
  newOwner: HexAddress
): Promise<{
  wait: () => Promise<void>;
}> {
  let namehash = getNamehash(name);
  let oldOwner = await getOwner(name)
  return await pns['safeTransferFrom(address,address,uint256)'](oldOwner, newOwner, namehash)
}


// /** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
//  * function setTTL(bytes32 name, uint64 ttl)
//  * setTTL('hero.eth', 3600) */
//  export function setTTL(name: DomainString, ttl: number): Promise<void> {
//   let namehash = getNamehash(name);
//   return pns.setTTL(namehash, ttl);
// }

/** 设置域名的解析地址 */
export async function setAddr(name: DomainString, key: string, value: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  // const resolverAddr = await pnsContract.resolver(namehash)

  try {
    // let coinType = coinTypes[key];
    const addr = await resolver.setKey(namehash, key, value);
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
  // return resolver.setText(namehash, key, value);
  return resolver.set("text."+key, value, namehash);
}

export function setContent(name: DomainString, value: string): Promise<void> {
  let namehash = getNamehash(name);
  return resolver.set("contenthash", value, namehash);
  // return resolver.setContenthash(namehash, value);
}

/** 一次性设置域名信息
 * function setRecord(bytes32 name, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setRecord(name: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(name);
  return pns.setRecord(namehash, newOwner, resolver, ttl);
}

/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export function mintSubdomain(name: DomainString, label: string, newOwner: HexAddress): Promise<any> {
  let namehash = getNamehash(name);
  return pns.mintSubdomain(namehash, label, newOwner);
}

// /** 设置子域名的所有者
//  * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
//  * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
// export function setSubnodeOwner(name: DomainString, label: string, newOwner: HexAddress): Promise<any> {
//   let namehash = getNamehash(name);
//   label = "0x" + keccak_256(label) || "0x0";
//   return pns.setSubnodeOwner(namehash, label, newOwner);
// }

// /** 一次性设置域名信息
//  * function setSubnodeRecord(bytes32 name, bytes32 label, address owner, address resolver, uint64 ttl)
//  * setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
// export function setSubnodeRecord(name: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
//   let namehash = getNamehash(name);
//   label = "0x" + keccak_256(label) || "0x0";
//   return pns.setSubnodeRecord(namehash, label, newOwner, resolver, ttl);
// }

// /** 根据名字设置子域名的所有者
//  * function setSubnodeOwner(bytes32 name, string subname, address owner)
//  * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
// export function setSubnameOwner(name: DomainString, subname: string, newOwner: HexAddress): Promise<any> {
//   let namehash = getNamehash(name);
//   return pns.setSubnameOwner(namehash, subname, newOwner);
// }

// /** 根据名字一次性设置域名信息
//  * function setSubnameRecord(bytes32 name, string subname, address owner, address resolver, uint64 ttl)
//  * setSubnameRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
// export function setSubnameRecord(name: DomainString, subname: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
//   let namehash = getNamehash(name);
//   return pns.setSubnameRecord(namehash, subname, newOwner, resolver, ttl);
// }

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
  return name.length > 3 && name.length < 64 && checkDomain(name, { allowUnicode: false, subdomain: false });
}

//////////////////////

export function getTld() {
  return "dot";
}

export function suffixTld(label: string): DomainString {
  return label.replace(".dot", "") + ".dot";
}

export function removeTld(label: string): DomainString {
  return label.replace(".dot", "")
}

/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export function setDefaultResolver(name: DomainString): Promise<any> {
  let namehash = getNamehash(name);
  return pns.setResolver(namehash, resolverAddr);
}

// export async function tryLogin(): Promise<void> {
//   await setup();
// }

export async function tryLogin(): Promise<void> {
  // 调用窗口, 登录账户
  await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  signer = await provider.getSigner();
  account = await signer.getAddress();
}

const hasuraUrl = "https://trusted-quagga-17.hasura.app/v1/graphql"

/** 列出用户的域名列表 */
export async function getDomains(account: string) {
  let query = "{\"query\":\"{domains(order_by: {name: asc}, where: {owner: {_eq: \\\""+account+"\\\"}}, distinct_on: name) {id name owner expires } }\",\"variables\":null}"
  let resp = await fetch(hasuraUrl, {
    "headers": {
      "content-type": "application/json",
    },
    "body": query,
    "method": "POST",
  })
  resp = await resp.json()
  return (resp as any).data.domains
}

/** 列出域名的子域名列表 */
export async function getSubdomains(domain: string) {
  let query = "{\"query\":\"{subdomains(order_by: {label: asc}, where: {node: {_eq: \\\""+domain+"\\\"}}, distinct_on: label) {id node label owner } }\",\"variables\":null}"
  let resp = await fetch(hasuraUrl, {
    "headers": {
      "content-type": "application/json",
    },
    "body": query,
    "method": "POST",
  })
  resp = await resp.json()
  return (resp as any).data.subdomains
}


const backendUrl = "https://pns.gigalixirapp.com"

export async function getRedeemCode(code: string) {
  let resp = await fetch(`${backendUrl}/api/redeem_codes/${code}`, {
    "headers": {
      "content-type": "application/json",
    },
    "method": "GET",
  })
  resp = await resp.json()
  return (resp as any)
}

export async function useRedeemCode(code: string, owner: string) {
  let resp = await fetch(`${backendUrl}/api/redeem_codes/${code}/use`, {
    "headers": {
      "content-type": "application/json",
    },
    "body": JSON.stringify({owner: owner}),
    "method": "POST",
  })
  resp = await resp.json()
  return (resp as any)
}

//// valid domain

const sldMap: any = {
  "ac.cn": true,
  "com.cn": true,
  "edu.cn": true,
  "gov.cn": true,
  "mil.cn": true,
  "net.cn": true,
  "org.cn": true,
}

function checkDomain (value: string, opts: any) {
  if (typeof value !== 'string') return false
  if (!(opts instanceof Object)) opts = {}
  value = value.toLowerCase()

  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1)
  }

  if (value.length > 253) {
    return false
  }

  const validChars = /^([a-z0-9-._*]+)$/g
  if (!validChars.test(value)) {
    return false
  }

  const sldRegex = /(.*)\.(([a-z0-9]+)(\.[a-z0-9]+))/
  const matches = value.match(sldRegex)
  var tld = null
  var labels = null
  if (matches && matches.length > 2) {
    if (sldMap[matches[2]]) {
      tld = matches[2]
      labels = matches[1].split('.')
    }
  }

  if (!labels) {
    labels = value.split('.')
    if (labels.length <= 1) return false

    tld = labels.pop()
    const tldRegex = /^(?:xn--)?(?!^\d+$)[a-z0-9]+$/gi

  }

  if (opts.subdomain === false && labels.length > 1) return false

  const isValid = labels.every(function (label: string, index: number) {
    if (opts.wildcard && index === 0 && label === '*' && labels.length > 1) {
      return true
    }

    let validLabelChars = /^([a-zA-Z0-9-_]+)$/g
    if (index === labels.length - 1) {
      validLabelChars = /^([a-zA-Z0-9-]+)$/g
    }

    const doubleDashCount = (label.match(/--/g) || []).length
    const xnDashCount = (label.match(/xn--/g) || []).length
    if (doubleDashCount !== xnDashCount) {
      return false
    }

    const isValid = (
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith('-') &&
      !label.endsWith('-')
    )

    return isValid
  })

  return isValid
}
