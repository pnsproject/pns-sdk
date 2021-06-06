import { Buffer as Buffer } from 'buffer/'
import { keccak_256 as sha3 } from 'js-sha3'
import { ethers } from "ethers"

import { abi as EnsAbi } from './contracts/ENSRegistry.json'
import { abi as RegistrarAbi } from './contracts/BaseRegistrarImplementation.json'
import { abi as ResolverAbi } from './contracts/PublicResolver.json'
import { abi as ReverseRegistrar } from './contracts/ReverseRegistrar.json'
import { abi as DummyOracleAbi } from './contracts/DummyOracle.json'
import { abi as StablePriceOracleAbi } from './contracts/StablePriceOracle.json'
import { abi as ETHRegistrarControllerAbi } from './contracts/ETHRegistrarController.json'
import { abi as BulkRenewalAbi } from './contracts/BulkRenewal.json'

function normalize(name) {
  return name
}

function encodeLabelhash(hash) {
  if (!hash.startsWith('0x')) {
    throw new Error('Expected label hash to start with 0x')
  }

  if (hash.length !== 66) {
    throw new Error('Expected label hash to have a length of 66')
  }

  return `[${hash.slice(2)}]`
}

function decodeLabelhash(hash) {
  if (!(hash.startsWith('[') && hash.endsWith(']'))) {
    throw Error(
      'Expected encoded labelhash to start and end with square brackets'
    )
  }

  if (hash.length !== 66) {
    throw Error('Expected encoded labelhash to have a length of 66')
  }

  return `${hash.slice(1, -1)}`
}

function isEncodedLabelhash(hash) {
  return hash.startsWith('[') && hash.endsWith(']') && hash.length === 66
}

function isDecrypted(name) {
  const nameArray = name.split('.')
  const decrypted = nameArray.reduce((acc, label) => {
    if (acc === false) return false
    return isEncodedLabelhash(label) ? false : true
  }, true)

  return decrypted
}

function labelhash(unnormalisedLabelOrLabelhash) {
  if(unnormalisedLabelOrLabelhash === '[root]'){
    return ''
  }
  return isEncodedLabelhash(unnormalisedLabelOrLabelhash)
    ? '0x' + decodeLabelhash(unnormalisedLabelOrLabelhash)
    : '0x' + sha3(normalize(unnormalisedLabelOrLabelhash))
}

function namehash(inputName) {
  if (inputName === '[root]'){
    return '0x0000000000000000000000000000000000000000000000000000000000000000'
  }
  let node = ''
  for (let i = 0; i < 32; i++) {
    node += '00'
  }

  if (inputName) {
    const labels = inputName.split('.')

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha
      if (isEncodedLabelhash(labels[i])) {
        labelSha = decodeLabelhash(labels[i])
      } else {
        let normalisedLabel = normalize(labels[i])
        labelSha = sha3(normalisedLabel)
      }
      node = sha3(new Buffer(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
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

const TLD = "eth"
const interfaces = {
  legacyRegistrar: '0x7ba18ba1',
  permanentRegistrar: '0x018fac06',
  permanentRegistrarWithConfig: '0xca27ac4c',
  baseRegistrar: '0x6ccb2df4',
  dnsRegistrar: '0x1aa2e641',
  bulkRenewal: '0x3150bfba'
}
const configs = {
  "0x4": {
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    resolverAddress: '0xd581f8C423408d08E8FDa4cEcDF4951D29867f89',
    registrarAddress: '0x09270d622cE1E2D2d53DA920EE9577dB83A167CB',
    reverseRegistrarAddress: '0x47FeB315728FeC50b2090035cEed0bE65065C14a',
  }
}

function getBufferedPrice(price){
  return price.mul(110).div(100)
}

const transferGasCost = 21000


class PNS {
  constructor () {}

  connect () {
    if (typeof ethereum !== 'undefined') {
      ethereum.enable()
      .catch(console.error)
    }
  }

  getTLD () {
    return TLD
  }

  async getAccount () {
    let accounts = await ethereum.request({ method: 'eth_accounts' })
    let from = accounts[0]
    if (!from) {
      return (await this.connect())
    }
    this.account = from
    return from
  }

  async setup ({ ensAddress }) {
    let accounts = await ethereum.request({ method: 'eth_accounts' })
    this.account = accounts[0]
    if (!this.account) {
      return (await this.connect())
    }

    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.signer = this.provider.getSigner()
    this.ensContract = new ethers.Contract(ensAddress, EnsAbi, this.signer);

    let resolverAddress = await this.ensContract.resolver(namehash('eth'))
    this.resolverContract = new ethers.Contract(resolverAddress, ResolverAbi, this.signer);
    // console.log('resolver', resolverAddress)

    let ethAddress = await this.ensContract.owner(namehash('eth'))
    this.registrarContract = new ethers.Contract(ethAddress, RegistrarAbi, this.signer);
    // console.log('registrarAddress', ethAddress)

    let controllerAddress = await this.resolverContract.interfaceImplementer(
      namehash('eth'),
      interfaces.permanentRegistrar
    )
    this.controllerContract = new ethers.Contract(controllerAddress, ETHRegistrarControllerAbi, this.signer)
    // console.log('controllerAddress', controllerAddress)

    let bulkRenewalAddress = await this.resolverContract.interfaceImplementer(
      namehash('eth'),
      interfaces.bulkRenewal
    )
    this.bulkRenewalContract = new ethers.Contract(bulkRenewalAddress, BulkRenewalAbi, this.signer)
    // console.log('bulkRenewalAddress', bulkRenewalAddress)

    return {
      provider: this.provider,
      signer: this.signer,
    }
  }

  getChainId () {
    return ethereum.chainId
  }

  getChainConfig () {
    return configs[this.getChainId()]
  }

  owner (node) {
    let namehashed = namehash(node)
    return this.ensContract.owner(namehashed)
  }

  // register (label) {
  //   label = '0x' + sha3(label)
  //   return this.registrarContract.register(label, this.account)
  // }

  setRecord (node, newOwner, resolver, ttl) {
    let namehashed = namehash(node)
    return this.ensContract.setRecord(namehashed, newOwner, resolver, ttl)
  }

  setSubnodeRecord (node, label, newOwner, resolver, ttl) {
    let namehashed = namehash(node)
    label = '0x' + sha3(label)
    return this.ensContract.setSubnodeRecord(namehashed, label, newOwner, resolver, ttl)
  }

  setOwner (node, newOwner) {
    let namehashed = namehash(node)
    return this.ensContract.setOwner(namehashed, label, newOwner)
  }

  setSubnodeOwner (node, label, newOwner) {
    let namehashed = namehash(node)
    label = '0x' + sha3(label)
    return this.ensContract.setSubnodeOwner(namehashed, label, newOwner)
  }

  setResolver (node, resolver) {
    let namehashed = namehash(node)
    return this.ensContract.setResolver(namehashed, resolver)
  }

  setTTL (node, ttl) {
    let namehashed = namehash(node)
    return this.ensContract.setTTL(namehashed, ttl)
  }

  getResolver (node) {
    let namehashed = namehash(node)
    return this.ensContract.resolver(namehashed)
  }

  getTTL (node) {
    let namehashed = namehash(node)
    return this.ensContract.ttl(namehashed)
  }

  recordExists (node) {
    let namehashed = namehash(node)
    return this.ensContract.recordExists(namehashed)
  }

  async getMinimumCommitmentAge() {
    const controllerContract = this.controllerContract
    return controllerContract.minCommitmentAge()
  }

  async getMaximumCommitmentAge(){
    const controllerContract = this.controllerContract
    return  controllerContract.maxCommitmentAge()
  }

  async getRentPrice(name, duration) {
    const controllerContract = this.controllerContract
    let price = await controllerContract.rentPrice(name, duration)
    return price
  }

  async getRentPrices(labels, duration) {
    const pricesArray = await Promise.all(
      labels.map(label => {
        return this.getRentPrice(label, duration)
      })
    )
    return pricesArray.reduce((a, c) => a.add(c))
  }

  async makeCommitment(name, owner, secret = '') {
    const controllerContract = this.controllerContract
    const resolverAddr = await this.owner('resolver.eth')
    secret = namehash('eth') // todo: store user
    if (parseInt(resolverAddr, 16) === 0) {
      return controllerContract.makeCommitment(name, owner, secret)
    } else {
      return controllerContract.makeCommitmentWithConfig(
        name,
        owner,
        secret,
        resolverAddr,
        this.account
      )
    }
  }

  async checkCommitment(label, secret = '') {
    const account = this.account
    const commitment = await this.makeCommitment(label, account, secret)
    return await this.controllerContract.commitments(commitment)
  }

  async commit(label, secret = '') {
    const account = this.account
    const commitment = await this.makeCommitment(label, account, secret)

    return this.controllerContract.commit(commitment)
  }

  async estimateGasLimit( cb ){
    let gas = 0
    try{
      gas = (await cb()).toNumber()
    }catch(e){
      let matched = e.message.match(/\(supplied gas (.*)\)/)
      if(matched){
        gas = parseInt(matched[1])
      }
      console.log({gas, e, matched})
    }
    return gas + transferGasCost
  }

  async register(label, duration, secret = '') {
    const permanentRegistrarController = this.controllerContract
    const account = this.account
    const price = await this.getRentPrice(label, duration)
    const priceWithBuffer = getBufferedPrice(price)
    const resolverAddr = await this.owner('resolver.eth')
    secret = namehash('eth')
    if (parseInt(resolverAddr, 16) === 0) {
      let gasLimit = await this.estimateGasLimit(() => {
        return permanentRegistrarController.estimateGas.register(
          label,
          account,
          duration,
          secret,
          { value:priceWithBuffer}
        )
      })

      gasLimit = 3000000

      return permanentRegistrarController.register(
        label,
        account,
        duration,
        secret,
        { value: priceWithBuffer, gasLimit }
      )
    } else {
      let gasLimit = await this.estimateGasLimit(() => {
        return permanentRegistrarController.estimateGas.registerWithConfig(
          label,
          account,
          duration,
          secret,
          resolverAddr,
          account,
          { value:priceWithBuffer}
        )
      })

      gasLimit = 3000000

      return permanentRegistrarController.registerWithConfig(
        label,
        account,
        duration,
        secret,
        resolverAddr,
        account,
        { value: priceWithBuffer, gasLimit }
      )
    }
  }

}

function start () {
  const pns = new PNS()
  document.querySelector('button').addEventListener('click', async () => {
    window.pns = pns

    console.log('account', await pns.getAccount())
    console.log(await pns.setup(pns.getChainConfig()))
    console.log('owner eth', await pns.owner('eth'))
    console.log('owner jiang.eth', await pns.owner('jiang.eth'))
    console.log('register hero', await pns.owner('hero.eth'))

    // console.log('getResolver jiang.eth', await pns.getResolver('jiang.eth'))
    // console.log('getResolver hero.eth', await pns.getResolver('hero.eth'))

    // console.log('getTTL jiang.eth', await pns.getTTL('jiang.eth'))
    // console.log('getTTL hero.eth', await pns.getTTL('hero.eth'))

    // console.log('recordExists jiang.eth', await pns.recordExists('jiang.eth'))
    // console.log('recordExists hero.eth', await pns.recordExists('hero.eth'))

    let rentPrice = await pns.controllerContract.rentPrice('eth', 86400*120)
    console.log(ethers.utils.formatEther(rentPrice))

    console.log('getMinimumCommitmentAge', await pns.getMinimumCommitmentAge())
    console.log('rentPrice', ethers.utils.formatEther(await pns.getRentPrice('gavinwood', 86400*365)))
    console.log('rentPrices', ethers.utils.formatEther(await pns.getRentPrices(['gavinwood', 'gavin'], 86400*365)))
    
    console.log('makeCommitment', await pns.makeCommitment('gavinwood123', pns.account))
    // console.log('commit', await pns.commit('gavinwood123', ''))
    // console.log('register', await pns.register('gavinwood123', 86400*120, ''))


    // console.log('register sub.hero', await pns.setSubnodeOwner('hero.dot'), 'hero')
    // console.log('register hero', await pns.register('hero'))
    // console.log('register hero', await pns.owner('hero.dot'))
    // console.log('register hero.hero.dot', await pns.owner('hero.hero.dot'))
  })
}

if (document) {
  start()
}

