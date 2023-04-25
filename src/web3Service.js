import Web3 from 'web3';
import axios from 'axios';
import daoAbi from '../abi.json'

let web3;

export const initializeWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("Error al conectar a MetaMask:", error);
    }
  } else {
    console.warn("Instale MetaMask para usar esta aplicación.");
  }
  return web3;
};

export const getWeb3Instance = () => {
  return web3;
};

export const getProposals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proposals');
      const proposals = response.data;
      console.log(proposals)
      return proposals;
    } catch (error) {
      console.error('Error al obtener las propuestas:', error);
      return null;
    }
  };

  export const vote = async (contractAddress, proposalId, supportsOptionA) => {
    try {
      const web3 = getWeb3Instance();
  
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const daoContract = new web3.eth.Contract(daoAbi, contractAddress);
        await daoContract.methods.vote(proposalId, supportsOptionA).send({ from: accounts[0] });
      }
    } catch (error) {
      console.error('Error al votar:', error);
    }
  };