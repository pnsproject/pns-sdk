import { ethers, BigNumber } from "ethers";
import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";
export declare type HexAddress = string;
export declare type DomainString = string;
export interface ContentType {
    value: string;
    contentType: string;
}
declare abstract class Web3Provider extends AbstractWeb3Provider {
    abstract getSigner(): Promise<Web3Signer>;
}
export declare type DomainDetails = {
    name: string;
    label: string;
    labelhash: string;
    owner: string;
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
export declare const formatEther: typeof ethers.utils.formatEther;
interface IContractAddrs {
    ens: string;
    resolver: string;
    registrar: string;
}
interface IContractAddrsMap {
    [index: number]: IContractAddrs;
}
export declare const ContractAddrMap: IContractAddrsMap;
export declare function sha3(data: string): string;
export declare function getNamehash(name: string): string;
export declare function switchChain(chainId: number): Promise<any>;
export declare function setProvider(providerOpt?: Web3Provider): Promise<void>;
export declare function setup(ensAddress?: string, resolverAddress?: string, registrarAddress?: string, providerOpt?: Web3Provider): Promise<{
    provider: Web3Provider;
    signer: ethers.Signer;
    ens: any;
    resolver: any;
    registrar: any;
}>;
export declare function setupByContract(ensContract: any, resolverContract: any, registrarContract: string, providerOpt: Web3Provider): Promise<{
    provider: Web3Provider;
    signer: ethers.Signer;
    ens: any;
    resolver: any;
    registrar: any;
}>;
export declare function getProvider(): Web3Provider;
export declare function getSigner(): Web3Signer;
export declare function getAccount(): string;
/** 获取域名的当前所有者 */
export declare function getOwner(name: DomainString): Promise<HexAddress>;
/** 获取域名的当前所有者 */
export declare function ownerOf(name: DomainString): Promise<HexAddress>;
/** 获取域名的当前所有者 */
export declare function exists(name: DomainString): Promise<HexAddress>;
/** 获取域名的解析器合约 */
export declare function getResolver(name: DomainString): Promise<HexAddress>;
export declare function addKey(key: string): Promise<void>;
export declare function setKey(name: DomainString, key: string, value: string): Promise<void>;
export declare function getKey(name: DomainString, key: string): Promise<HexAddress>;
/** 获取域名的解析地址 */
export declare function getAddr(name: DomainString, key: string): Promise<HexAddress>;
/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 name) returns (uint64)
 * getTTL('hero.eth') */
export declare function getText(name: DomainString, key: string): Promise<number>;
/** 获得域名的IPFS内容地址 */
export declare function getContent(name: DomainString): Promise<ContentType>;
export declare function getLabelhash(rawlabel: string): HexAddress;
/** 获得域名详细信息 */
export declare function getDomainDetails(name: DomainString): Promise<DomainDetails>;
export declare function totalRegisterPrice(name: DomainString, duration: number): Promise<BigNumber>;
export declare function rentPrice(name: DomainString, duration: number): Promise<BigNumber>;
export declare function nameExpires(label: DomainString): Promise<BigNumber>;
export declare function available(label: DomainString): Promise<boolean>;
/** 域名注册 */
export declare function register(label: DomainString, account: string, duration: number): Promise<{
    wait: () => Promise<void>;
}>;
export declare function controllerRoot(): Promise<{
    wait: () => Promise<void>;
}>;
export declare function mintRedeem(start: number, end: number): Promise<{
    wait: () => Promise<void>;
}>;
export declare function nameRedeemAny(label: DomainString, account: string, duration: number, nonce: number, code: string): Promise<{
    wait: () => Promise<void>;
}>;
export declare function generateRedeemCode(duration: number, nonce: number): Promise<string>;
export declare function renew(label: DomainString, duration: number): Promise<void>;
/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export declare function setResolver(name: DomainString, resolver?: HexAddress): Promise<any>;
/** 设置域名的所有者
 * function setOwner(bytes32 name, address owner)
 * setOwner('hero.eth', '0x123456789') */
export declare function setOwner(name: DomainString, newOwner: HexAddress): Promise<{
    wait: () => Promise<void>;
}>;
/** 设置域名的解析地址 */
export declare function setAddr(name: DomainString, key: string, value: string): Promise<HexAddress>;
export declare function setText(name: DomainString, key: string, value: string): Promise<void>;
export declare function setContent(name: DomainString, value: string): Promise<void>;
/** 一次性设置域名信息
 * function setRecord(bytes32 name, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export declare function setRecord(name: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any>;
/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export declare function mintSubdomain(name: DomainString, label: string, newOwner: HexAddress): Promise<any>;
export declare function matchProtocol(text: string): RegExpMatchArray | null;
export declare function getProtocolType(encoded: string): {
    protocolType: string;
    decoded: string;
};
/** 解析IPFS地址 */
export declare function decodeIpfsUrl(url: string): string;
export declare function setDomainDetails(name: string, textRecords: any, addrs: any, content: string): Promise<void>;
/** 目前使用的都都是基于 eth 的域名, 后续扩展再拆分函数 */
export declare function isValidDomain(rawName: string): boolean;
export declare function getTld(): string;
export declare function suffixTld(label: string): DomainString;
export declare function removeTld(label: string): DomainString;
/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export declare function setDefaultResolver(name: DomainString): Promise<any>;
export declare function tryLogin(): Promise<void>;
/** 列出用户的域名列表 */
export declare function getDomains(account: string): Promise<any>;
/** 列出域名的子域名列表 */
export declare function getSubdomains(domain: string): Promise<any>;
export {};
