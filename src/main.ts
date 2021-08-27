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
  setSubnodeRecord,
  setOwner,
  setSubnodeOwner,
  setResolver,
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

    console.log("gavin012345.dot owner", await getOwner("gavin012345.dot"));
    console.log("gavin012345.dot addr", await getAddr("gavin012345.dot", "ETH"));
    console.log("gavin012345.dot resolver", await getResolver("gavin012345.dot"));
    console.log("gavin012345.dot expiries", (await nameExpires("gavin012345")).toNumber());
    console.log("gavin012345.dot getRentPrice", await getRentPrice("gavin012345", 86400));
    console.log("gavin012345.dot available", await available("gavin012345"));
    console.log("getDomainDetails", await getDomainDetails("gavin012345.dot"));

    console.log("getMinCommitmentAge", (await getMinCommitmentAge()).toNumber());
    console.log("formatEther", ethers.utils.formatEther(1000));

    console.log("gavin012345.dot commit", await commit("gavin012345", account));

    console.log("gavin012345.dot register", await register("gavin012345", account, 28 * 86400));

    console.log("gavin012345.dot renew", await renew("gavin012345", 86400));

    console.log("new getDomainDetails", await getDomainDetails("gavin012345.dot"));

    console.log("gavin012345.dot setResolver", await setResolver("gavin012345.dot"));

    console.log("gavin012345.dot setTTL", await setTTL("gavin012345.dot", 86400));

    console.log("gavin012345.dot setAddr", await setAddr("gavin012345.dot", 'ETH', account));

    console.log("gavin012345.dot setText", await setText("gavin012345.dot", 'com.github', 'gavinwood'));

    let ipfsurl = "/ipfs/QmV1F3RbQeQEs3FToNi81JXkxaTDLYpHqDeQC9bpxJLLnC";

    console.log('gavin012345.dot setContent', await setContent('gavin012345.dot', decodeIpfsUrl(ipfsurl)))

    console.log('gavin012345.dot setRecord', await setRecord('gavin012345.dot', account, resolverAddr, 3600))

    console.log("new getDomainDetails", await getDomainDetails("gavin012345.dot"));

    console.log("gavin012345.dot getTTL", await getTTL("gavin012345.dot"));

    console.log('gavin012345.dot setSubnodeOwner', await setSubnodeOwner('gavin012345.dot', 'sub', account))

    console.log('gavin012345.dot setSubnodeRecord', await setSubnodeRecord('gavin012345.dot', 'sub', account, resolverAddr, 3600))

    console.log("new getDomainDetails", await getDomainDetails("sub.gavin012345.dot"));

    console.log(
      "setDomainDetails",
      await setDomainDetails(
        "gavin012345.dot",
        [{ key: "com.twitter", value: "gavinwood0" }],
        [],
        ''
      )
    );

    console.log(
      "setDomainDetails",
      await setDomainDetails(
        "gavin012345.dot",
        [{ key: "com.github", value: "gavinwood" }, { key: "com.twitter", value: "gavinwood" }],
        [{ key: "KSM", value: account }],
        decodeIpfsUrl(ipfsurl)
      )
    );

    console.log("new getDomainDetails", await getDomainDetails("gavin012345.dot"));
  });
}

if (document) {
  start();
}

// main()
//   .catch(console.error)
//   .finally(() => {});
