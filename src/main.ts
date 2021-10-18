import './style.css'

import * as Buffer from "Buffer";
// import { Buffer as Buffer } from "buffer/";
// (window as any).Buffer = Buffer

import {
  setup,
  getOwner,
  getAddr,
  getResolver,
  nameExpires,
  getRentPrice,
  available,
  getDomainDetails,
  register,
} from "./sdk";


import {
  formatsByName
} from "./encoder";

import { matchProtocol,
    decodeContenthash,
    encodeContenthash,
    validateContent,
    isValidContenthash,
    getProtocolType,encodeContentUrl,
    decodeContentUrl } from './encoder'

function testContenthash() {
  let ipfsFileHash = 'QmXXpqAyzxcXpuSX79u9CNWqm5oNkgdZFyBjEoeWUK37hE'
  let ipfsDirHash = 'QmWTFxSWzpyXmXbeASu4sksmezhSR5fzPEaQJCrJgu7hbB'

  let ipnsAddr = '12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR'

  let ipfsFullPath = 'ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html'
  let ipnsFullPath = 'ipns://12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR/wiki/Vincent_van_Gogh.html'

  let ipfsUrlPath = 'ipfs://QmbFeRhQBfH4FBgvYQUphsXwQLxQoerwAsztHone8nBwQp'
  let ipfsFilePath = '/ipfs/QmbFeRhQBfH4FBgvYQUphsXwQLxQoerwAsztHone8nBwQp'
  let ipnsUrl = 'ipns://12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR'
  let ipnsPath = '/ipns/12D3KooWLjfJj6fJiKPcmUTuNdmSTUHakKmDqeoaqTw1vhtM3yyR'


  console.log(matchProtocol(ipfsUrlPath))
  console.log(matchProtocol(ipfsFilePath))
  console.log(matchProtocol(ipnsUrl))
  console.log(matchProtocol(ipnsPath))

  console.log(encodeContenthash(ipfsFileHash))
  console.log(encodeContenthash(ipfsFilePath))
  console.log(encodeContenthash(ipnsUrl))
  console.log(encodeContenthash(ipnsPath))
}

async function main() {
  let ethAddress = '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4'
  let polkaAddress = '5DPSiNGHJaRZy6e6qyD6FmWnC8wj9kGALLkDH5qxnc56QcGg'
  let btcAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  let data

  data = formatsByName['ETH'].decoder(ethAddress)
  console.log(data.toString('hex'))
  console.log(formatsByName['ETH'].encoder(data))

  // data = formatsByName['BTC'].decoder(btcAddress)
  // console.log(data.toString('hex'))
  // console.log(formatsByName['BTC'].encoder(data))
  // console.log('btc')

  data = formatsByName['DOT'].decoder(polkaAddress)
  console.log(data.toString('hex'))
  console.log(formatsByName['DOT'].encoder(data))
  console.log('dot', polkaAddress)

  data = formatsByName['KSM'].decoder(polkaAddress)
  console.log(data.toString('hex'))
  console.log(formatsByName['KSM'].encoder(data))
  console.log('ksm', polkaAddress)
  
  // testContenthash()

  await setup()

  let account = '0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4'
  // console.log("gavin000001.dot register", await register("gavin000001", account, 28 * 86400));
  
  console.log("dot owner", await getOwner("dot"));

  // console.log("gavin000001.dot owner", await getOwner("gavin000001.dot"));
  // console.log("gavin000001.dot addr", await getAddr("gavin000001.dot", "ETH"));
  // console.log("gavin000001.dot resolver", await getResolver("gavin000001.dot"));
  // console.log("gavin000001.dot expiries", (await nameExpires("gavin000001")).toNumber());
  // console.log("gavin000001.dot getRentPrice", await getRentPrice("gavin000001", 86400));
  // console.log("gavin000001.dot available", await available("gavin000001"));
  // console.log("getDomainDetails", await getDomainDetails("gavin000001.dot"));
}

async function start() {
  let button = document.querySelector("button")
  if (button) {
    button.addEventListener("click", async () => {
      await main()
    })
  }
}

if (document) {
  start()
  .catch(console.error)
  .finally(() => {});
}
