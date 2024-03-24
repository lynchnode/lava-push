require('colors');
const readline = require('readline-sync');
let count = 0;
const callRpcEthereum = require('./callRpcEthereum');
const callRpcNear = require('./callRpcNear');
const callRpcAxelar = require('./callRpcAxelar');
const callRpcStarkNet = require('./callRpcStarknet');
require('dotenv').config();

const rpcUrls = [
  { url: process.env.RPC_ETH, callRpc: callRpcEthereum },
  { url: process.env.RPC_NEAR, callRpc: callRpcNear },
  { url: process.env.RPC_STARKNET, callRpc: callRpcStarkNet },
  { url: process.env.RPC_AXELAR, callRpc: callRpcAxelar }
];

async function loopRPC() {
  while (true) {
    const randomIndex = Math.floor(Math.random() * rpcUrls.length);
    const { url, callRpc } = rpcUrls[randomIndex];

    await callRpc(url, count);

    const randomMinutes = Math.floor(Math.random() * (59 - 5 + 1)) + 5;
    console.log(`Waiting for ${randomMinutes} minute(s)...`.yellow);
    await new Promise((resolve) =>
      setTimeout(resolve, randomMinutes * 60 * 1000)
    );
  }
}

loopRPC();
