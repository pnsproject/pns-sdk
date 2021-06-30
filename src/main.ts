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
  signLoginMessage,
  getLoginToken,
  tryLogin,
  listFav,
  createFav,
  deleteFav,
} from "./devkit";

function start() {
  document.querySelector("button").addEventListener("click", async () => {

    await setup();
    let jwt = await tryLogin(); // 进行登录，获取 jwt

    let account = getAccount(); // 获取 account
    console.log(account)

    let res = await createFav(jwt, account, 'polkadot.eth') // 添加用户的域名
    console.log(res)

    let mydomains = await listFav(jwt, account) // 获取用户的域名列表
    console.log('mydomains', mydomains)

    let domainId = mydomains[0].id
    console.log('mydomains', domainId)

    await deleteFav(jwt, domainId) // 删除用户的域名

    mydomains = await listFav(jwt, account) // 获取用户的域名列表
    console.log('mydomains', mydomains)


    

    console.log("eth owner", await getOwner("eth"));
    console.log("eth addr", await getAddr("eth", "ETH"));

    console.log("jiang.eth owner", await getOwner("jiang.eth"));

    console.log("jiang.eth addr", await getAddr("jiang.eth", "ETH"));

    console.log("jiang.eth getRentPrice", await getRentPrice("jiang", 86400));
  });
}

if (document) {
  start();
}
