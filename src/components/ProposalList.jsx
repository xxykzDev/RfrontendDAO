// ProposalList.jsx

import React, { useEffect, useState } from 'react';
import { getProposals, vote } from '../web3Service';

const contractAddress = '0xe0f49611233443Db3F6512E24776CFA18C986781';

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const proposals = await getProposals(contractAddress);
      setProposals(proposals);
    };

    fetchProposals();
  }, []);

  const handleVote = async (proposalId, supportsOptionA) => {
    await vote(contractAddress, proposalId, supportsOptionA);
  };

  return (
    <div>
      <h2>Lista de Propuestas</h2>
      {proposals.length === 0 ? (
        <p>No hay propuestas disponibles</p>
      ) : (
        <ul>
          {proposals.map((proposal, index) => (
            <li key={index}>
              <h3>
                {proposal.title}{' '}
                {proposal.timeRemainingFront < 0 && (
                  <span style={{ color: 'red' }}>(Voting Closed)</span>
                )}
              </h3>
              <p>{proposal.description}</p>
              <p>Opción A: {proposal.optionAText}</p>
              <p>Opción B: {proposal.optionBText}</p>
              <p>Votos para la opción A: {proposal.optionA}</p>
              <p>Votos para la opción B: {proposal.optionB}</p>
              {proposal.timeRemainingFront >= 0 ? (
                <div>
                  <button onClick={() => handleVote(proposal.id, true)}>Votar por la opción A</button>
                  <button onClick={() => handleVote(proposal.id, false)}>Votar por la opción B</button>
                </div>
              ) : (
                <p style={{ color: 'gren' }}>
                  Opción ganadora:{' '}
                  {proposal.optionA > proposal.optionB ? proposal.optionAText : proposal.optionBText}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProposalList;
