import { useState } from 'react';
import ConnectWalletButton from './components/ConnectWalletButton';
import JoinDAOButton from './components/JoinDAOButton';
import ProposalList from './components/ProposalList';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ConnectWalletButton />
      <JoinDAOButton />
      <ProposalList />
    </>
  );
}

export default App;
