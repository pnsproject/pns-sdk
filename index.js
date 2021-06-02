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


class PNS {
  constructor () {}

  connect () {
    if (typeof ethereum !== 'undefined') {
      ethereum.enable()
      .catch(console.error)
    }
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

  async getProvider (ensAddress, resolverAddress, registrarAddress,reverseRegistrarAddress) {
    let accounts = await ethereum.request({ method: 'eth_accounts' })
    this.account = accounts[0]
    if (!this.account) {
      return (await this.connect())
    }

    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.signer = this.provider.getSigner()
    this.ensContract = new ethers.Contract(ensAddress, EnsAbi, this.signer);
    this.resolverContract = new ethers.Contract(resolverAddress, ResolverAbi, this.signer);
    this.registrarContract = new ethers.Contract(registrarAddress, RegistrarAbi, this.signer);

    return {
      provider: this.provider,
      signer: this.signer,
    }
  }

  owner (node) {
    let namehashed = namehash(node)
    return this.ensContract.owner(namehashed)
  }

  register (label) {
    label = '0x' + sha3(label)
    return this.registrarContract.register(label, this.account)
  }

  createSubdomain (node, label) {
    let namehashed = namehash(node)
    label = '0x' + sha3(label)
    return this.ensContract.setSubnodeOwner(namehashed, label, this.account)
  }
}

function start () {
  const pns = new PNS()
  document.querySelector('button').addEventListener('click', async () => {
    let ensAddress = '0xef9Da876d7f9e5b1E8919a7CF94A327d57c6CAb7'
    let resolverAddress = '0xd581f8C423408d08E8FDa4cEcDF4951D29867f89'
    let registrarAddress = '0x09270d622cE1E2D2d53DA920EE9577dB83A167CB'
    let reverseRegistrarAddress = '0x47FeB315728FeC50b2090035cEed0bE65065C14a'

    console.log('account', await pns.getAccount())
    console.log(await pns.getProvider(ensAddress, resolverAddress, registrarAddress,reverseRegistrarAddress))
    console.log('owner dot', await pns.owner('dot'))
    console.log('owner super.dot', await pns.owner('super.dot'))
    console.log('register hero', await pns.owner('hero.dot'))
    // console.log('register sub.hero', await pns.createSubdomain('hero.dot'), 'hero')
    // console.log('register hero', await pns.register('hero'))
    console.log('register hero', await pns.owner('hero.dot'))
    console.log('register hero.hero.dot', await pns.owner('hero.hero.dot'))
  })
}

if (document) {
  start()
}

