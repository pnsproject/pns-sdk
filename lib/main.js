import './style.css';
import * as Buffer from "Buffer";
// import { Buffer as Buffer } from "buffer/";
window.Buffer = Buffer.Buffer;
import { setup, getOwner, controllerRoot, ownerOf, exists, } from "./sdk";
import { formatsByName } from "./encoder";
import { matchProtocol, encodeContenthash } from './encoder';
function testContenthash() {
    let ipfsFileHash = 'QmXXpqAyzxcXpuSX79u9CNWqm5oNkgdZFyBjEoeWUK37hE';
    let ipfsDirHash = 'QmWTFxSWzpyXmXbeASu4sksmezhSR5fzPEaQJCrJgu7hbB';
    let ipnsAddr = '12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR';
    let ipfsFullPath = 'ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html';
    let ipnsFullPath = 'ipns://12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR/wiki/Vincent_van_Gogh.html';
    let ipfsUrlPath = 'ipfs://QmbFeRhQBfH4FBgvYQUphsXwQLxQoerwAsztHone8nBwQp';
    let ipfsFilePath = '/ipfs/QmbFeRhQBfH4FBgvYQUphsXwQLxQoerwAsztHone8nBwQp';
    let ipnsUrl = 'ipns://12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR';
    let ipnsPath = '/ipns/12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR';
    console.log(matchProtocol(ipfsUrlPath));
    console.log(matchProtocol(ipfsFilePath));
    console.log(matchProtocol(ipnsUrl));
    console.log(matchProtocol(ipnsPath));
    console.log(encodeContenthash(ipfsFileHash));
    console.log(encodeContenthash(ipfsFilePath));
    console.log(encodeContenthash(ipnsUrl));
    console.log(encodeContenthash(ipnsPath));
}
async function main() {
    let ethAddress = '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4';
    let polkaAddress = '5DPSiNGHJaRZy6e6qyD6FmWnC8wj9kGALLkDH5qxnc56QcGg';
    let btcAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    let data;
    data = formatsByName['ETH'].decoder(ethAddress);
    console.log(data.toString('hex'));
    console.log(formatsByName['ETH'].encoder(data));
    // data = formatsByName['BTC'].decoder(btcAddress)
    // console.log(data.toString('hex'))
    // console.log(formatsByName['BTC'].encoder(data))
    // console.log('btc')
    data = formatsByName['DOT'].decoder(polkaAddress);
    console.log(data.toString('hex'));
    console.log(formatsByName['DOT'].encoder(data));
    console.log('dot', polkaAddress);
    data = formatsByName['KSM'].decoder(polkaAddress);
    console.log(data.toString('hex'));
    console.log(formatsByName['KSM'].encoder(data));
    console.log('ksm', polkaAddress);
    // testContenthash()
    await setup();
    let account = '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4';
    // console.log("gavin000001.dot register", await register("gavin000001", account, 28 * 86400));
    // console.log("gavin000001.dot register", await setResolver("gavin000001.dot"));
    console.log("dot owner", await getOwner("dot"));
    console.log("dot owner", await ownerOf("dot"));
    console.log("dot owner", await exists("dot"));
    console.log("eth owner", await getOwner("eth"));
    console.log("eth owner", await exists("eth"));
    console.log("gavin000002.dot owner", await getOwner("gavin000002.dot"));
    // console.log("gavin000001.dot addKey", await addKey("ETH"));
    // console.log("gavin000001.dot addKey", await addKey("BTC"));
    // console.log("gavin000001.dot addKey", await addKey("DOT"));
    // console.log("gavin000001.dot addKey", await addKey("KSM"));
    // console.log("gavin000001.dot addKey", await addKey("text.email"));
    // console.log("gavin000001.dot addKey", await addKey("text.url"));
    // console.log("gavin000001.dot addKey", await addKey("text.avatar"));
    // console.log("gavin000001.dot addKey", await addKey("text.description"));
    // console.log("gavin000001.dot addKey", await addKey("text.notice"));
    // console.log("gavin000001.dot addKey", await addKey("text.keywords"));
    // console.log("gavin000001.dot addKey", await addKey("text.com.twitter"));
    // console.log("gavin000001.dot addKey", await addKey("text.com.github"));
    // console.log("gavin000001.dot addKey", await addKey("contenthash"));
    // console.log("gavin000001.dot setKey", await setKey("gavin000001.dot", "ETH", account));
    // console.log("gavin000001.dot getKey", await getKey("gavin000001.dot", "ETH"));
    // console.log("gavin000001.dot resolver", await getResolver("gavin000001.dot"));
    // console.log("gavin000001.dot expiries", (await nameExpires("gavin000001.dot")).toNumber());
    // console.log("gavin000001.dot rentPrice", await rentPrice("gavin000001", 86400));
    // console.log("gavin000001.dot available", await available("gavin000001.dot"));
    console.log("gavin000001.dot controllerRoot", await controllerRoot());
    // console.log("gavin000001.dot mintRedeem", await mintRedeem(1,100));
    // console.log("gavin000001.dot generateRedeemCode", await generateRedeemCode(86400*365,1));
    // let code = ''
    // console.log("gavin000002.dot nameRedeemAny", await nameRedeemAny("gavin000002", account, 86400*365, 1, code));
    // console.log("getDomainDetails", await getDomainDetails("gavin000001.dot"));
    // console.log("setDomainDetails");
    // await setDomainDetails(
    //   "gavin000001.dot",
    //   [{ key: "com.twitter", value: "gavinwood0" }],
    //   [],
    //   ''
    // )
}
async function start() {
    let button = document.querySelector("button");
    if (button) {
        button.addEventListener("click", async () => {
            await main();
        });
    }
}
if (document) {
    start()
        .catch(console.error)
        .finally(() => { });
}
//# sourceMappingURL=main.js.map