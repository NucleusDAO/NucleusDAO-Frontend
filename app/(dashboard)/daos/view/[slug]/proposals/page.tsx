'use client';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { AppContext, IProposal } from '@/context/app-context';
import { useContext, useState, useEffect } from 'react';

const EachDaoProposals = () => {
  const { currentDAO, currentDAOId, getProposals } = useContext(AppContext);
  const [proposalData, setProposalData] = useState<any[]>();

  const getStatus = (_proposal: IProposal) => {
    if (_proposal.isExecuted) {
      return 'SUCCESS';
    }
    if (new Date(_proposal.endTime).valueOf() > Date.now().valueOf()) {
      return 'ACTIVE';
    } else {
      if (_proposal.votesFor > _proposal.votesAgainst) {
        return 'PENDING';
      } else {
        return 'FAILED';
      }
    }
  };

  useEffect(() => {
    if (currentDAOId) {
      getProposals(currentDAO.contractAddress).then(
        (proposals: IProposal[]) => {
          setProposalData(
            proposals.map((proposal: IProposal) => {
              return {
                type: proposal.proposalType,
                status: getStatus(proposal),
                description: proposal.description,
                wallet:
                  proposal.target.slice(0, 6) +
                  '...' +
                  proposal.target.slice(-4),
                duration: new Date().toLocaleDateString('en-Gb', {
                  day: 'numeric',
                }),
                totalVote: `${proposal.votesFor} + ${proposal.votesAgainst}`,
                organisation: currentDAO.name,
                id: proposal.id.toString(),
              };
            })
          );
        }
      );
    }
  }, [currentDAOId]);

  const getDuration = () => {};

  return proposalData ? (
    <div className='-mt-4'>
      <EachFilterTab proposalData={proposalData} />
    </div>
  ) : (
    <>Loading...</>
  );
};

export default EachDaoProposals;
