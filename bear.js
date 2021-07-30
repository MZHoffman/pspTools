const BNBPP_ADDRESS = '0x516ffd7d1e0ca40b1879935b2de87cb20fc1124b'
const AMOUNT_TO_BET = process.env.BET_AMOUNT || '0.001' // in BNB

import dotenv from 'dotenv'
import { parseEther } from '@ethersproject/units'
import { ethers } from 'ethers'
import { BNBPP_ABI } from './bnbpp-abi.js'

dotenv.config()

const provider = new ethers.providers.JsonRpcProvider(
  'https://bsc-dataseed.binance.org/'
)

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const bnbppContract = new ethers.Contract(BNBPP_ADDRESS, BNBPP_ABI, signer)

console.log('Starting. Amount to bet:', AMOUNT_TO_BET)

bnbppContract.on('StartRound', async (epoch) => {
  console.log('Started Epoch', +epoch)
  console.log('Betting is Bear Started')

  const tx = await bnbppContract.betBear({
    value: parseEther(AMOUNT_TO_BET),
  })

  console.log('Bear Betting Tx Started')

  try {
    await tx.wait()

    console.log('Bear Betting Tx Success')
  } catch {
    console.log('Bear Betting Tx Error')
  }
})
