const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'swallow radio panda endless bicycle arena story winter ahead dismiss decade multiply',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/e66c6786fc4e4498b85dad63f994340c'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    compiledFactory.abi
  )
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1400000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// Contract deployed to 0x5f0b9d9e4094766a166e5C7fcC93E618B42Fb57f (contract factory address)