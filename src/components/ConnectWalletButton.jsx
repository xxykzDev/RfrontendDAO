import React, { useState } from 'react';
import { initializeWeb3 } from '../web3Service';

const ConnectWalletButton = () => {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    const web3 = await initializeWeb3();
    if (web3) {
      setConnected(true);
    }
  };

  return (
    <button onClick={connectWallet} disabled={connected}>
      {connected ? 'Wallet Conectada' : 'Conectar Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
