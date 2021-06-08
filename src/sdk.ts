import { Buffer as Buffer } from "buffer/";
import { keccak_256 as sha3 } from "js-sha3";
import { ethers, Contract } from "ethers";

import { EnsAbi, RegistrarAbi, ResolverAbi, ETHRegistrarControllerAbi, BulkRenewalAbi } from "./contracts";

import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";

import { HexAddress, DomainString } from "./types";

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

function namehash(inputName) {
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

// let TLD = "dot"
// let configs = {
//   "0x4": {
//     ensAddress: '0xef9Da876d7f9e5b1E8919a7CF94A327d57c6CAb7',
//     resolverAddress: '0xd581f8C423408d08E8FDa4cEcDF4951D29867f89',
//     registrarAddress: '0x09270d622cE1E2D2d53DA920EE9577dB83A167CB',
//     reverseRegistrarAddress: '0x47FeB315728FeC50b2090035cEed0bE65065C14a',
//   }
// }

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

function getBufferedPrice(price) {
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

  constructor() {}

  connect() {
    if (typeof ethereum !== "undefined") {
      ethereum.enable().catch(console.error);
    }
  }

  getTLD() {
    return TLD;
  }

  /** TODO, 内部逻辑需要优化, 类型不一致 */
  async getAccount(): Promise<HexAddress | void> {
    let accounts = await ethereum.request({ method: "eth_accounts" });
    let from = accounts[0];
    if (!from) {
      return await this.connect();
    }
    this.account = from;
    return from;
  }

  async setup({ ensAddress }) {
    let accounts = await ethereum.request({ method: "eth_accounts" });
    this.account = accounts[0];
    if (!this.account) {
      return await this.connect();
    }

    this.provider = new ethers.providers.Web3Provider(ethereum as any);
    this.signer = this.provider.getSigner();
    this.ensContract = new ethers.Contract(ensAddress, EnsAbi, this.signer);

    let resolverAddress = await this.ensContract.resolver(namehash("eth"));
    this.resolverContract = new ethers.Contract(resolverAddress, ResolverAbi, this.signer);
    // console.log('resolver', resolverAddress)

    let ethAddress = await this.ensContract.owner(namehash("eth"));
    this.registrarContract = new ethers.Contract(ethAddress, RegistrarAbi, this.signer);
    // console.log('registrarAddress', ethAddress)

    let controllerAddress = await this.resolverContract.interfaceImplementer(namehash("eth"), interfaces.permanentRegistrar);
    this.controllerContract = new ethers.Contract(controllerAddress, ETHRegistrarControllerAbi, this.signer);
    // console.log('controllerAddress', controllerAddress)

    let bulkRenewalAddress = await this.resolverContract.interfaceImplementer(namehash("eth"), interfaces.bulkRenewal);
    this.bulkRenewalContract = new ethers.Contract(bulkRenewalAddress, BulkRenewalAbi, this.signer);
    // console.log('bulkRenewalAddress', bulkRenewalAddress)

    return {
      provider: this.provider,
      signer: this.signer,
    };
  }

  getChainId() {
    return ethereum.chainId;
  }

  getChainConfig() {
    return configs[this.getChainId()];
  }

  owner(node) {
    let namehashed = namehash(node);
    return this.ensContract.owner(namehashed);
  }

  // 一次性设置域名信息
  // function setRecord(bytes32 node, address owner, address resolver, uint64 ttl)
  // example:
  // pns.setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400)
  setRecord(node: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number) {
    let namehashed = namehash(node);
    return this.ensContract.setRecord(namehashed, newOwner, resolver, ttl);
  }

  // 一次性设置域名信息
  // function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl)
  // example:
  // pns.setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400)
  setSubnodeRecord(node: DomainString, label: string, newOwner: HexAddress, resolver, HexAddress, ttl: number) {
    let namehashed = namehash(node);
    label = "0x" + sha3(label);
    return this.ensContract.setSubnodeRecord(namehashed, label, newOwner, resolver, ttl);
  }

  // 设置子域名的所有者
  // function setOwner(bytes32 node, address owner)
  // example:
  // pns.setOwner('hero.eth', '0x123456789')
  setOwner(node: DomainString, newOwner: HexAddress) {
    let namehashed = namehash(node);
    return this.ensContract.setOwner(namehashed, newOwner);
  }

  // 设置子域名的所有者
  // function setSubnodeOwner(bytes32 node, bytes32 label, address owner)
  // example:
  // pns.setSubnodeOwner('hero.eth', 'sub', '0x123456789')
  setSubnodeOwner(node: DomainString, label: string, newOwner: HexAddress) {
    let namehashed = namehash(node);
    label = "0x" + sha3(label);
    return this.ensContract.setSubnodeOwner(namehashed, label, newOwner);
  }

  // 设置域名 resolver 参数，表示域名的解析器
  // function setResolver(bytes32 node, address resolver)
  // example:
  // pns.setResolver('hero.eth', '0x123456789')
  setResolver(node: DomainString, resolver: HexAddress) {
    let namehashed = namehash(node);
    return this.ensContract.setResolver(namehashed, resolver);
  }

  // 设置域名 ttl 参数，表示域名可以在本地缓存的时间
  // function setTTL(bytes32 node, uint64 ttl)
  // example:
  // pns.setTTL('hero.eth', 3600)
  setTTL(node: DomainString, ttl: number): void {
    let namehashed = namehash(node);
    return this.ensContract.setTTL(namehashed, ttl);
  }

  // 获得域名 resolver 参数，由用户设置，表示域名的解析器
  // function getResolver(bytes32 node) returns (address)
  // example:
  // pns.getResolver('hero.eth')
  getResolver(node: DomainString): HexAddress {
    let namehashed = namehash(node);
    return this.ensContract.resolver(namehashed);
  }

  // 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
  // function getTTL(bytes32 node) returns (uint64)
  // example:
  // pns.getTTL('hero.eth')
  getTTL(node: DomainString): number {
    let namehashed = namehash(node);
    return this.ensContract.ttl(namehashed);
  }

  // 检查域名是否已经存在
  // function recordExists(bytes32 node) returns (bool)
  // example:
  // pns.recordExists('hero.eth')
  recordExists(node: DomainString): boolean {
    let namehashed = namehash(node);
    return this.ensContract.recordExists(namehashed);
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
  async getRentPrice(name: DomainString, duration: number): Promise<number> {
    const controllerContract = this.controllerContract;
    let price = await controllerContract.rentPrice(name, duration);
    return price;
  }

  async getRentPrices(labels: string[], duration: number): Promise<number> {
    const pricesArray = await Promise.all(
      labels.map((label) => {
        return this.getRentPrice(label, duration);
      })
    );
    return pricesArray.reduce((a: any, c) => a.add(c));
  }

  async makeCommitment(name: DomainString, owner: HexAddress, secret = "") {
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

  // 内部方法，用于估算交易手续费
  async estimateGasLimit(cb: () => any) {
    let gas = 0;
    try {
      gas = (await cb()).toNumber();
    } catch (e) {
      let matched = e.message.match(/\(supplied gas (.*)\)/);
      if (matched) {
        gas = parseInt(matched[1]);
      }
      console.log({ gas, e, matched });
    }
    return gas + transferGasCost;
  }

  // 域名注册（第二步）
  async register(label: DomainString, duration: number, secret = "") {
    const permanentRegistrarController = this.controllerContract;
    const account = this.account;
    const price = await this.getRentPrice(label, duration);
    const priceWithBuffer = getBufferedPrice(price);
    const resolverAddr = await this.owner("resolver.eth");
    secret = namehash("eth");
    if (parseInt(resolverAddr, 16) === 0) {
      let gasLimit = await this.estimateGasLimit(() => {
        return permanentRegistrarController.estimateGas.register(label, account, duration, secret, { value: priceWithBuffer });
      });

      gasLimit = 3000000;

      return permanentRegistrarController.register(label, account, duration, secret, { value: priceWithBuffer, gasLimit });
    } else {
      let gasLimit = await this.estimateGasLimit(() => {
        return permanentRegistrarController.estimateGas.registerWithConfig(label, account, duration, secret, resolverAddr, account, { value: priceWithBuffer });
      });

      gasLimit = 3000000;

      return permanentRegistrarController.registerWithConfig(label, account, duration, secret, resolverAddr, account, { value: priceWithBuffer, gasLimit });
    }
  }
}
