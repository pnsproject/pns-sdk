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
  getMinCommitmentAge,
  commit,
  register,
  signLoginMessage,
  getLoginToken,
  tryLogin,
  listFav,
  createFav,
  deleteFav,
  expiriesAt,
  available,
  renew,
  decodeIpfsUrl,
  setDomainDetails
} from "./devkit";

function start() {
  document.querySelector("button").addEventListener("click", async () => {
    await setup();
    let jwt = await tryLogin(); // 进行登录，获取 jwt

    let account = getAccount(); // 获取 account
    console.log(account);

    let res = await createFav(jwt, account, "polkadot.eth"); // 添加用户的域名
    console.log(res);

    let mydomains = await listFav(jwt, account); // 获取用户的域名列表
    console.log("my fav domains", mydomains);

    let domainId = mydomains[0].id;
    console.log("domainId to delete", domainId);

    await deleteFav(jwt, domainId); // 删除用户的域名

    mydomains = await listFav(jwt, account); // 获取用户的域名列表
    console.log("my fav domains", mydomains);


    console.log("eth owner", await getOwner("eth"));
    console.log("eth addr", await getAddr("eth", "ETH"));

    console.log("jiang0.eth owner", await getOwner("jiang0.eth"));

    console.log("jiang0.eth addr", await getAddr("jiang0.eth", "ETH"));

    console.log("jiang0.eth getRentPrice", await getRentPrice("jiang0", 86400));

    console.log("jiang0.eth expiries", (await expiriesAt("jiang0")).toNumber());

    console.log("jiang0.eth available", await available("jiang0"));

    console.log('getMinCommitmentAge', (await getMinCommitmentAge()).toNumber())

    console.log('getDomainDetails', await getDomainDetails('jiang0'))

    let code = 'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu'
    console.log(ethers.utils.base58.decode(code))


    let url = '/ipfs/QmV1F3RbQeQEs3FToNi81JXkxaTDLYpHqDeQC9bpxJLLnC'

    // console.log('jiang0.eth setContent', await setContent('jiang0.eth', decodeIpfsUrl(url)))


    // console.log('getDomainDetails', await setDomainDetails('jiang0', [], [], ))
    console.log('setDomainDetails', await setDomainDetails('jiang0.eth', [], [], decodeIpfsUrl(url)))

    // console.log("jiang0.eth commit", await commit("jiang0", '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4'));

    // console.log("jiang.eth register", await register("jiang0", '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4', 28 * 86400));

    // console.log("jiang0.eth renew", await renew("jiang0", 86400));


  });
}

if (document) {
  start();
}
