import { ethers } from "ethers";
import {
  getNamehash,
  getLabelhash,
  ContractAddrs,
  getProvider,
  getSigner,
  getAccount,
  setup,
  getOwner,
  getResolver,
  getRentPrice,
  getAddr,
  getContent,
  getDomainDetails,
  getTTL,
  getText,
  setText,
  setContent,
  setRecord,
  setSubnodeRecord,
  setOwner,
  setSubnodeOwner,
  setResolver,
  setTTL,
  setDefaultResolver,
  setAddr,
  makeCommitment,
  checkCommitment,
  commit,
  register,
} from "./devkit";

function start() {
  document.querySelector("button").addEventListener("click", async () => {
    let ctx = await setup(ContractAddrs.ens, ContractAddrs.resolver, ContractAddrs.registrar, ContractAddrs.controller);

    (window as any).provider = getProvider();
    (window as any).signer = getSigner();
    let account = getAccount();
    console.log(account)

    console.log("eth owner", await getOwner("eth"));
    console.log("eth addr", await getAddr("eth", "ETH"));

    console.log("jiang.eth owner", await getOwner("jiang.eth"));

    console.log("jiang.eth addr", await getAddr("jiang.eth", "ETH"));
  });
}

if (document) {
  start();
}
