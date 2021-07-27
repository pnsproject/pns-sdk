/// <reference types="typings" />
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { HexAddress, DomainString, ContentType } from "./types";
import { JsonRpcSigner } from "@ethersproject/providers";
export declare function getNamehash(name: string): HexAddress;
export declare function getLabelhash(rawlabel: string): HexAddress;
export declare function encodeLabelhash(hash: string): string;
export declare function decodeLabelhash(hash: string): string;
export declare const stripHexPrefix: (str: HexAddress) => string;
export declare const toChecksumAddress: (address: HexAddress) => HexAddress;
export declare const ContractAddrs: {
    ens: string;
    resolver: string;
    registrar: string;
    controller: string;
};
export declare function setProvider(): Promise<void>;
/** 设置ens并初始化 */
export declare function setup(ensAddress?: string, resolverAddress?: string, registrarAddress?: string, controllerAddress?: string): Promise<{
    provider: ethers.providers.Web3Provider;
    signer: any;
    ens: any;
    resolver: any;
    registrar: any;
    controller: any;
}>;
export declare function getTld(): string;
export declare function suffixTld(label: string): DomainString;
export declare function getProvider(): ethers.providers.Web3Provider;
export declare function getSigner(): JsonRpcSigner;
export declare function getAccount(): string;
/** 获取域名的当前所有者 */
export declare function getOwner(name: DomainString): Promise<HexAddress>;
/** 获取域名的解析器合约 */
export declare function getResolver(name: DomainString): Promise<HexAddress>;
/** 获取域名的解析地址 */
export declare function getAddr(name: DomainString, key: string): Promise<HexAddress>;
/** 设置域名的解析地址 */
export declare function setAddr(name: DomainString, key: string, value: string): Promise<HexAddress>;
/** 获得 MinimumCommitmentAge 参数，即注册的第一步到第二步之间的最小时间间隔 */
export declare function getMinimumCommitmentAge(controller: any): Promise<number>;
/** 获得 getMaximumCommitmentAge 参数，即注册的第一步到第二步之间的最大时间间隔 */
export declare function getMaximumCommitmentAge(controller: any): Promise<number>;
/** 获得当前域名注册价格
 * function getRentPrice(string name, uint duration) returns (uint)
 * getRentPrice('hero', 86400*365) */
export declare function getRentPrice(name: DomainString, duration: number): Promise<number>;
/** 同上, 但返回一个 BigNumber, 内部需要 */
export declare function getRentPriceBigNumber(name: DomainString, duration: number): Promise<BigNumber>;
/** 批量获得当前域名注册价格 */
export declare function getRentPrices(labels: string[], duration: number): Promise<number>;
export declare function getMinCommitmentAge(): Promise<BigNumber>;
/** 计算commitment */
export declare function makeCommitment(label: DomainString, account: HexAddress): Promise<HexAddress>;
/** 检查是否已经提交commitment */
export declare function checkCommitment(account: string, label: DomainString): Promise<any>;
/** 开始注册域名（第一步），这一步是提交commitment */
export declare function commit(label: DomainString, account: string): Promise<any>;
/** 域名注册（第二步），完成域名注册 */
export declare function register(label: DomainString, account: string, duration: number): Promise<{
    /** 额外的等待请求 */
    wait: () => Promise<void>;
}>;
export declare function expiriesAt(label: DomainString): Promise<BigNumber>;
export declare function available(label: DomainString): Promise<void>;
export declare function renew(label: DomainString, duration: number): Promise<void>;
export declare function decodeContenthash(encoded: string): any;
/** 获得域名的IPFS内容地址 */
export declare function getContent(name: DomainString): Promise<ContentType>;
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
/** 获得域名详细信息 */
export declare function getDomainDetails(name: DomainString): Promise<DomainDetails>;
export declare function setDomainDetails(name: string, textRecords: any, addrs: any, content: string): Promise<void>;
/** 一次性设置域名信息
 * function setRecord(bytes32 name, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export declare function setRecord(name: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any>;
/** 一次性设置域名信息
 * function setSubnodeRecord(bytes32 name, bytes32 label, address owner, address resolver, uint64 ttl)
 * setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export declare function setSubnodeRecord(name: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any>;
/** 设置子域名的所有者
 * function setOwner(bytes32 name, address owner)
 * setOwner('hero.eth', '0x123456789') */
export declare function setOwner(name: DomainString, newOwner: HexAddress): Promise<{
    wait: () => Promise<void>;
}>;
/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 name, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export declare function setSubnodeOwner(name: DomainString, label: string, newOwner: HexAddress): Promise<any>;
/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export declare function setResolver(name: DomainString, resolver: HexAddress): Promise<any>;
/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export declare function setDefaultResolver(name: DomainString): Promise<any>;
/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 name, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export declare function setTTL(name: DomainString, ttl: number): Promise<void>;
/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 name) returns (uint64)
 * getTTL('hero.eth') */
export declare function getTTL(name: DomainString): Promise<number>;
/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 name, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export declare function setText(name: DomainString, key: string, value: string): Promise<void>;
/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 name) returns (uint64)
 * getTTL('hero.eth') */
export declare function getText(name: DomainString, key: string): Promise<number>;
/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 name, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export declare function setContent(name: DomainString, value: string): Promise<void>;
/** 获取用户登录的签名token */
export declare function signLoginMessage(): Promise<string>;
/** 通过用户登录的签名token登录 */
export declare function getLoginToken(sig: string): Promise<any>;
export declare function autoLogin(): Promise<string>;
export declare function tryLogin(): Promise<string>;
/** 列出用户关注的域名列表 */
export declare function listFav(account: HexAddress): Promise<{
    domain: string;
    id: string;
    account: HexAddress;
}[]>;
/** 创建用户关注的域名 */
export declare function createFav(account: HexAddress, domain: DomainString): Promise<any>;
/** 取消用户关注的域名 */
export declare function deleteFav(id: string): Promise<any>;
/** 列出用户的子域名列表 */
export declare function listSubdomain(account: HexAddress): Promise<any>;
/** 创建用户的子域名 */
export declare function createSubdomain(account: HexAddress, domain: DomainString, data: string): Promise<any>;
/** 删除用户的子域名 */
export declare function deleteSubdomain(id: string): Promise<any>;
/** 列出用户的域名列表 */
export declare function listDomain(account: HexAddress): Promise<any>;
/** 创建用户的域名 */
export declare function createDomain(account: HexAddress, domain: DomainString, data: string): Promise<any>;
/** 删除用户的域名 */
export declare function deleteDomain(id: string): Promise<any>;
export declare function matchProtocol(text: string): RegExpMatchArray;
export declare function getProtocolType(encoded: string): {
    protocolType: string;
    decoded: string;
};
/** 解析IPFS地址 */
export declare function decodeIpfsUrl(url: string): string;
/** 目前使用的都都是基于 eth 的域名, 后续扩展再拆分函数 */
export declare function isValidDomain(rawName: string): boolean;
