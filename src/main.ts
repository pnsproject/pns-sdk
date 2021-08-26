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
  listDomain,
  createDomain,
  deleteDomain,
  listSubdomain,
  createSubdomain,
  deleteSubdomain,
  expiriesAt,
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


    const INFURA_ID = '75e0d27975114086be0463cf2597549e'
    // const providerOptions = {};
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: INFURA_ID
          }
        },
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const web3provider = await web3Modal.connect();
    const eprovider = new ethers.providers.Web3Provider(web3provider) as Web3Provider;
    console.log(await eprovider.getNetwork())



//  Create WalletConnect Provider
// const wprovider: any = new WalletConnectProvider({
//   infuraId: "75e0d27975114086be0463cf2597549e",
// });

//  Enable session (triggers QR Code modal)
// await wprovider.enable();

    console.log(ethers.utils.hexlify(5))

    let chain: any = {
      "name": "Avalanche Mainnet",
      "chain": "AVAX",
      "network": "mainnet",
      "rpc": [
        "https://api.avax.network/ext/bc/C/rpc"
      ],
      "faucets": [],
      "nativeCurrency": {
        "name": "Avalanche",
        "symbol": "AVAX",
        "decimals": 18
      },
      "infoURL": "https://cchain.explorer.avax.network/",
      "shortName": "Avalanche",
      "chainId": 43114,
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

    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [params, account],
    })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    });

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

    // console.log("eth owner", await getOwner("eth"));
    // console.log("eth addr", await getAddr("eth", "ETH"));

    // console.log("yong.eth owner", await getOwner("yong.eth"));

    // console.log("gavin0.dot owner", await getOwner("gavin0.dot"));

    // console.log("gavin0.dot addr", await getAddr("gavin0.dot", "ETH"));

    // console.log("gavin0.dot getRentPrice", await getRentPrice("gavin0", 86400));

    // console.log("gavin0.dot expiries", (await expiriesAt("gavin0")).toNumber());

    // console.log("gavin0.dot available", await available("gavin0"));

    // console.log("getMinCommitmentAge", (await getMinCommitmentAge()).toNumber());

    // console.log("getDomainDetails", await getDomainDetails("gavin0.dot"));
    // console.log("gavin12.dot getDomainDetails", await getDomainDetails("gavin12.dot"));

    // let code = "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu";
    // console.log(ethers.utils.base58.decode(code));


    // console.log("formatEther", ethers.utils.formatEther(1000));

    // console.log('gavin0.dot setContent', await setContent('gavin0.dot', decodeIpfsUrl(ipfsurl)))

    // console.log(
    //   "setDomainDetails",
    //   await setDomainDetails(
    //     "gavin0.dot",
    //     [{ key: "com.twitter", value: "gavinwood0" }],
    //     [],
    //     ''
    //   )
    // );

    // console.log(
    //   "setDomainDetails",
    //   await setDomainDetails(
    //     "gavin0.dot",
    //     [{ key: "com.github", value: "gavinwood" }, { key: "com.twitter", value: "gavinwood" }],
    //     [{ key: "KSM", value: Aliceth }],
    //     decodeIpfsUrl(ipfsurl)
    //   )
    // );

    // console.log("gavin0.dot commit", await commit("gavin0", Aliceth));

    // console.log("gavin0.dot register", await register("gavin0", Aliceth, 28 * 86400));

    // console.log("gavin0.dot renew", await renew("gavin0", 86400));
  });
}

if (document) {
  start();
}

import { ApiPromise, WsProvider } from "@polkadot/api";

async function main() {
  const provider = new WsProvider("ws://127.0.0.1:9944");

  const api = await ApiPromise.create({ provider });


  let {
    data: { free: previousFree },
    nonce: previousNonce,
  } = await api.query.system.account(Alice);

  console.log(`${Alice} has a balance of ${previousFree}, nonce ${previousNonce}`);

  //////////

  let count = 0;

  // Subscribe to the new headers on-chain. The callback is fired when new headers
  // are found, the call itself returns a promise with a subscription that can be
  // used to unsubscribe from the newHead subscription
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at block: #${header.number}`);

    if (++count === 256) {
      unsubscribe();
    }
  });

  //////////

  const [chain, nodeName, nodeVersion] = await Promise.all([api.rpc.system.chain(), api.rpc.system.name(), api.rpc.system.version()]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

// main()
//   .catch(console.error)
//   .finally(() => {});
