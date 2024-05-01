'use client';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { AppContext, IProposal } from '@/context/app-context';
import { useContext, useState, useEffect } from 'react';

const EachDaoProposals = () => {
  const { currentDAO, getProposals } = useContext(AppContext);
  const [proposalData, setProposalData] = useState<any[]>();

  const getStatus = (_proposal: IProposal) => {
    return 'ACTIVE';
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
    console.log({ currentDAO });
    if (currentDAO) {
      getProposals(currentDAO.contractAddress).then(
        (proposals: IProposal[]) => {
          console.log({ proposals });
          setProposalData(
            proposals.map((proposal: IProposal) => {
              return {
                type:
                  proposal.proposalType.slice(0, 1).toUpperCase() +
                  proposal.proposalType.slice(1).toLowerCase(),
                status: getStatus(proposal),
                description: proposal.description,
                wallet:
                  proposal.target.slice(0, 6) +
                  '...' +
                  proposal.target.slice(-4),

                duration: getDuration(proposal.startTime, proposal.endTime),
                totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
                organisation: currentDAO.name,
                id: proposal.id.toString(),
              };
            })
          );
        }
      );
    }
  }, [currentDAO]);

  // get duration in this format from startTime and endTime
  // 3d 10h 23m
  const getDuration = (startTime: number, endTime: number) => {
    const diffMs = endTime - startTime;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;

    return `${days}d ${remainingHours}h ${remainingMinutes}m`;
  };

  return proposalData ? (
    <div className='-mt-4'>
      <EachFilterTab proposalData={proposalData} />
    </div>
  ) : (
    <>Loading...</>
  );
};

export default EachDaoProposals;
