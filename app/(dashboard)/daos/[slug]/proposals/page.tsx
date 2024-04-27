'use client';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { AppContext } from '@/context/app-context';
import { useContext } from 'react';

const EachDaoProposals = () => {
  const { eachDAOProposal } = useContext(AppContext);

  return (
    <div className="-mt-4">
      <EachFilterTab proposalData={eachDAOProposal} />
    </div>
  );
};

export default EachDaoProposals;
