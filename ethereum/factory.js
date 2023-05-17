import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0xE290f85781DC923C232cb3EB9970606fB388c9c6"
);

export default instance;