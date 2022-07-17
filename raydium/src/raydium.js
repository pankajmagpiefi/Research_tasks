const solanaWeb3 = require('@solana/web3.js');
const raydiumWeb3 = require('@raydium-io/raydium-sdk');
const express = require('express');
const raydium_data_fetcher = express();

const establishConnection = async () =>{
 rpcUrl="https://rpc.ankr.com/solana";
 connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
 console.log('Connection to cluster established:', rpcUrl);
}
establishConnection();

const axios = require('axios');

axios.get('https://api.raydium.io/v2/sdk/token/raydium.mainnet.json')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

const got = require('got');

got('https://api.raydium.io/v2/sdk/token/raydium.mainnet.json', { json: true }).then(response => {
  console.log(response.body.url);
  console.log(response.body.explanation);
}).catch(error => {
  console.log(error.response.body);
});