import { Slider } from '@/components/ui/slider';
import { Clock5, Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDate, updateGetProposal } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { AppContext } from '@/context/app-context';
import { toast } from 'sonner';

interface IProposalResult {
  currentProposal: {
    duration: string;
    startTime: number;
    endTime: number;
    votesFor: number;
    votesAgainst: number;
    totalVote: string;
    id: string;
    status: string;
  };
}

const ProposalResult = ({ currentProposal }: IProposalResult) => {
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const { duration, startTime, endTime, votesFor, votesAgainst, totalVote } =
    currentProposal;
  const { getEachDAO, getProposals, executeProposal, getUsersActivities } =
    useContext(AppContext);
  const {
    currentDAO,
    setCurrentDAO,
    setEachDAOProposal,
    setMembersActivities,
  } = useContext(EachDaoContext);
  const percentageOfVoteFor =
    Number(totalVote) > 0 ? (votesFor / Number(totalVote)) * 100 : 0;
  const percentageOfVoteAgainst =
    Number(totalVote) > 0 ? (votesAgainst / Number(totalVote)) * 100 : 0;

  const handleExecuteProposal = async () => {
    setIsExecuting(true);
    try {
      await executeProposal(
        Number(currentProposal.id),
        currentDAO.contractAddress
      );
      await updateGetProposal({
        getEachDAO,
        daoId: currentDAO.id,
        setCurrentDAO,
        getProposals,
        setEachDAOProposal,
        getUsersActivities,
        setMembersActivities,
      });
      toast.success('Proposal executed successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg dark:bg-[#191919] p-8 space-y-5 bg-white">
        <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
          <h3 className="font-medium text-xl dark:text-white text-dark">
            Result
          </h3>
          <p className="text-sm font-light">
            Approved by:{' '}
            <span className="dark:text-white text-dark font-medium">{`${percentageOfVoteFor}%`}</span>
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="dark:text-white text-dark font-medium text-base">
              Yes
            </p>
            <p className="text-defaultText font-light text-base">{`${percentageOfVoteFor}%`}</p>
          </div>
          <Slider
            defaultValue={[percentageOfVoteFor]}
            max={100}
            step={1}
            thumbClassName="hidden"
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between pt-4">
            <p className="text-white font-medium text-base">No</p>
            <p className="text-defaultText font-light text-base">{`${percentageOfVoteAgainst}%`}</p>
          </div>
          <Slider
            defaultValue={[percentageOfVoteAgainst]}
            max={100}
            step={1}
            thumbClassName="hidden"
          />
        </div>
        {currentProposal.status === 'Pending' && (
          <React.Fragment>
            {percentageOfVoteFor >= currentDAO.quorum && (
              <Button
                className="w-full"
                onClick={handleExecuteProposal}
                loading={isExecuting}
                loadingText="Executing..."
              >
                Excecute Proposal
              </Button>
            )}
          </React.Fragment>
        )}
      </div>

      <div className="rounded-lg dark:bg-[#191919] p-8 space-y-3 bg-white">
        <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
          <h3 className="font-medium text-xl text-dark dark:text-white">
            Status
          </h3>
          <p className="text-sm font-light flex space-x-2">
            <span>
              <Clock5 size={18} />
            </span>
            <span>Time left:</span>{' '}
            <span className="text-dark dark:text-white font-light">
              {duration}
            </span>
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="text-dark dark:text-white font-medium text-sm">
            {formatDate(startTime)}
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="dark:text-white text-dark font-medium text-sm">
            {formatDate(endTime)}
          </p>
        </div>

        <div className="flex justify-between py-4 border-t border-[#CCCCCC99] dark:border-[#292929] items-center">
          <div className="flex space-x-2 items-center">
            <p className="font-light text-sm text-dark dark:text-white">
              Quorum
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} color="#444444" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="font-light text-sm text-dark dark:text-white">{`${Number(
            currentDAO.quorum
          )}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalResult;
