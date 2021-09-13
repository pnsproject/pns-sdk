import { ethers } from "ethers";
import {
  ContractAddrs,
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
  setOwner,
  setSubnodeOwner,
  setSubnodeRecord,
  setSubnameOwner,
  setSubnameRecord,
  setResolver,
  setOwner,
  setTTL,
  setDefaultResolver,
  setAddr,
  makeCommitment,
  checkCommitment,
  getMinCommitmentAge,
  commit,
  register,
  signLoginMessage,
  getLoginToken,
  tryLogin,
  listFav,
  createFav,
  deleteFav,
  listDomain,
  createDomain,
  deleteDomain,
  listSubdomain,
  createSubdomain,
  deleteSubdomain,
  nameExpires,
  available,
  renew,
  decodeIpfsUrl,
  setDomainDetails,
  autoLogin,
} from "./sdk";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const Aliceth = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'
const Alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
const ipfsurl = "/ipfs/QmV1F3RbQeQEs3FToNi81JXkxaTDLYpHqDeQC9bpxJLLnC";


function start() {
  document.querySelector("button").addEventListener("click", async () => {
    // await setup();
    // let jwt = await tryLogin(); // 进行登录，获取 jwt

    await autoLogin();

    let provider = getProvider()
    console.log("getProvider", provider);

    const { chainId } = await provider.getNetwork()
    console.log(chainId)

    console.log("getSigner", getSigner());
    // console.log(await getOwner("yong.dot"));

    let account = getAccount(); // 获取 account
    console.log(account);

    // let res = await createFav(account, "polkadot.eth"); // 添加用户收藏的域名
    // console.log(res);

    // let mydomains = await listFav(account); // 获取用户收藏的域名列表
    // console.log("my fav domains", mydomains);

    // let domainId = mydomains[0].id;
    // console.log("domainId to delete", domainId);

    // await deleteFav(domainId); // 删除用户收藏的域名

    // res = await createDomain(account, "polkadot.eth", "{}"); // 添加用户的域名
    // console.log(res);

    // mydomains = await listDomain(account); // 获取用户的域名列表
    // console.log("my domains", mydomains);

    // domainId = mydomains[0].id;
    // console.log("domainId to delete", domainId);

    // await deleteDomain(domainId); // 删除用户的域名

    // mydomains = await listDomain(account); // 获取用户的域名列表
    // console.log("my domains", mydomains);

    // res = await createSubdomain(account, "polkadot.eth", "{}"); // 添加用户的域名
    // console.log(res);

    // mydomains = await listSubdomain(account); // 获取用户的域名列表
    // console.log("my domains", mydomains);

    // domainId = mydomains[0].id;
    // console.log("domainId to delete", domainId);

    // await deleteSubdomain(domainId); // 删除用户的域名

    // mydomains = await listSubdomain(account); // 获取用户的域名列表
    // console.log("my domains", mydomains);

    let resolverAddr = ContractAddrs.resolver

    console.log("eth owner", await getOwner("eth"));
    console.log("eth addr", await getAddr("eth", "ETH"));

    console.log("dot owner", await getOwner("dot"));
    console.log("dot addr", await getAddr("dot", "ETH"));

    console.log("gavin0123456.dot owner", await getOwner("gavin0123456.dot"));
    console.log("gavin0123456.dot addr", await getAddr("gavin0123456.dot", "ETH"));
    console.log("gavin0123456.dot resolver", await getResolver("gavin0123456.dot"));
    console.log("gavin0123456.dot expiries", (await nameExpires("gavin0123456")).toNumber());
    console.log("gavin0123456.dot getRentPrice", await getRentPrice("gavin0123456", 86400));
    console.log("gavin0123456.dot available", await available("gavin0123456"));
    console.log("getDomainDetails", await getDomainDetails("gavin0123456.dot"));

    console.log("getMinCommitmentAge", (await getMinCommitmentAge()).toNumber());
    console.log("formatEther", ethers.utils.formatEther(1000));

    console.log("gavin0123456.dot commit", await commit("gavin0123456", account));

    console.log("gavin0123456.dot register", await register("gavin0123456", account, 28 * 86400));

    // let wallet = '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4'
    // console.log('wallet', account, await provider.getTransactionCount(wallet))
    // console.log("gavin0123456.dot owner", await getOwner("gavin0123456.dot"));

    // console.log("gavin0123456.dot renew", await renew("gavin0123456", 86400));

    // console.log("new getDomainDetails", await getDomainDetails("gavin0123456.dot"));

    // console.log("gavin0123456.dot setResolver", await setResolver("gavin0123456.dot"));

    // console.log("gavin0123456.dot setTTL", await setTTL("gavin0123456.dot", 86400));

    // console.log("gavin0123456.dot setAddr", await setAddr("gavin0123456.dot", 'ETH', account));

    // console.log("gavin0123456.dot setOwner", await setOwner("gavin0123456.dot", account));

    // console.log("gavin0123456.dot setText", await setText("gavin0123456.dot", 'com.github', 'gavinwood'));

    // let ipfsurl = "/ipfs/QmV1F3RbQeQEs3FToNi81JXkxaTDLYpHqDeQC9bpxJLLnC";

    // console.log('gavin0123456.dot setContent', await setContent('gavin0123456.dot', decodeIpfsUrl(ipfsurl)))

    // console.log('gavin0123456.dot setRecord', await setRecord('gavin0123456.dot', account, resolverAddr, 3600))

    // console.log("new getDomainDetails", await getDomainDetails("gavin0123456.dot"));

    // console.log("gavin0123456.dot getTTL", await getTTL("gavin0123456.dot"));

    // console.log('gavin0123456.dot setSubnodeOwner', await setSubnodeOwner('gavin0123456.dot', 'sub', account))

    // console.log('gavin0123456.dot setSubnodeRecord', await setSubnodeRecord('gavin0123456.dot', 'sub', account, resolverAddr, 3600))

    // console.log('gavin0123456.dot setSubnodeOwner', await setSubnodeOwner('gavin0123456.dot', 'sub', account))

    // console.log('gavin0123456.dot setSubnodeRecord', await setSubnodeRecord('gavin0123456.dot', 'sub', account, resolverAddr, 3600))

    console.log('gavin0123456.dot setSubnameOwner', await setSubnameOwner('gavin0123456.dot', 'sub2', account))

    console.log('gavin0123456.dot setSubnameRecord', await setSubnameRecord('gavin0123456.dot', 'sub3', account, resolverAddr, 3600))

    // console.log("new getDomainDetails", await getDomainDetails("sub.gavin0123456.dot"));

    // console.log(
    //   "setDomainDetails",
    //   await setDomainDetails(
    //     "gavin0123456.dot",
    //     [{ key: "com.twitter", value: "gavinwood0" }],
    //     [],
    //     ''
    //   )
    // );

    // console.log(
    //   "setDomainDetails",
    //   await setDomainDetails(
    //     "gavin0123456.dot",
    //     [{ key: "com.github", value: "gavinwood" }, { key: "com.twitter", value: "gavinwood" }],
    //     [{ key: "KSM", value: account }],
    //     decodeIpfsUrl(ipfsurl)
    //   )
    // );

    console.log("new getDomainDetails", await getDomainDetails("gavin0123456.dot"));
  });
}

if (document) {
  start();
}

// main()
//   .catch(console.error)
//   .finally(() => {});
