import React, { useState } from 'react';
import { getWeb3Instance} from '../web3Service';
import daoAbi from '../../abi.json'

const contractAddress = '0xe0f49611233443Db3F6512E24776CFA18C986781';

const JoinDAOButton = () => {
  const [joined, setJoined] = useState(false);

  const joinDAO = async () => {
    try {
      const web3 = getWeb3Instance();

      if (web3 && daoAbi) {
        const accounts = await web3.eth.getAccounts();
        const daoContract = new web3.eth.Contract(daoAbi, contractAddress);
        await daoContract.methods.joinDAO().send({ from: accounts[0] });
        setJoined(true);
      }
    } catch (error) {
      console.error('Error al unirse al DAO:', error);
    }
  };

  return (
    <button onClick={joinDAO} disabled={joined}>
      {joined ? 'Ya te has unido' : 'Unirse la DAO'}
    </button>
  );
};

export default JoinDAOButton;
