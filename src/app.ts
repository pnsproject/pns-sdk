import { ethers } from "ethers";

import { PNS, signLoginMessage, getLoginToken, listFav, createFav, deleteFav, listSubdomain, createSubdomain, deleteSubdomain } from "./sdk";

function start() {
  const pns = new PNS();

  console.log("connection status:", pns.isConnected());

  document.querySelector("button").addEventListener("click", async () => {
    (window as any).pns = pns;

    console.log("account", await pns.getAccount());
    console.log(await pns.setup(pns.getChainConfig()));
    // console.log("eth owner", await pns.getOwner("eth"));
    // console.log("hero owner", await pns.getOwner("hero.eth"));
    // console.log("jiang.eth owner", await pns.getOwner("jiang.eth"));
    // console.log('jiang.eth address', await pns.getAddr('jiang.eth', 'ETH'))

    // console.log('getResolver jiang.eth', await pns.getResolver('jiang.eth'))
    // console.log('getResolver hero.eth', await pns.getResolver('hero.eth'))

    // console.log('getTTL jiang.eth', await pns.getTTL('jiang.eth'))
    // console.log('getTTL hero.eth', await pns.getTTL('hero.eth'))

    // console.log('recordExists jiang.eth', await pns.recordExists('jiang.eth'))
    // console.log('recordExists hero.eth', await pns.recordExists('hero.eth'))

    // console.log("getMinimumCommitmentAge", await pns.getMinimumCommitmentAge());
    // console.log("rentPrice", ethers.utils.formatEther(await pns.getRentPrice("gavinwood", 86400 * 365)));
    // console.log("rentPrices", ethers.utils.formatEther((await pns.getRentPrices(["gavinwood", "gavin"], 86400 * 365)) as any));



    // console.log("makeCommitment", await pns.makeCommitment("gavinwood123", pns.account));
    // console.log('commit', await pns.commit('gavinwood123', ''))
    // console.log('register', await pns.register('gavinwood123', 86400*120, ''))

    // console.log('register sub.hero', await pns.setSubnodeOwner('hero.dot'), 'hero')
    // console.log('register hero', await pns.register('hero'))
    // console.log('register hero', await pns.owner('hero.dot'))
    // console.log('register hero.hero.dot', await pns.owner('hero.hero.dot'))



    let sig = await signLoginMessage()
    console.log('sig', sig)

    // get jwt token
    let token = await getLoginToken(sig)
    console.log('token', token)

    // manege fav domains
    // console.log(await listFav(token, account))
    // console.log(await createFav(token, account, 'wood.dot'))
    // console.log(await deleteFav(token, "301742510103855619"))

    // manege sub domains
    // console.log(await listSubdomain(token, account))
    // console.log(await createSubdomain(token, account, 'sub.wood.dot', '{}'))
    // console.log(await deleteSubdomain(token, "301751372315886084"))
  });
}

if (document) {
  start();
}
