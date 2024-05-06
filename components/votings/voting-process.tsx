'use client';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { toast } from 'sonner';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '../animation-options';
import { AppContext } from '@/context/app-context';
import { updateGetProposal } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import { updateProposalEP } from '@/config/apis';
import { usePathname } from 'next/navigation';

interface IVotingProcess {
  currentProposal: {
    id: string;
    votes: { account: string; support: boolean }[];
  };
}

const VotingProcess = ({ currentProposal }: IVotingProcess) => {
  const {
    voteFor,
    voteAgainst,
    getEachDAO,
    getProposals,
    getUsersActivities,
    getProposal,
  } = useContext(AppContext);
  const {
    currentDAO,
    setCurrentDAO,
    setEachDAOProposal,
    setMembersActivities,
    eachDAOProposal,
  } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected, address } = user;
  const userVote = address
    ? currentProposal.votes.find(
        (vote: { account: string; support: boolean }) =>
          vote.account === address
      )
    : null;
  const defaultSelection = userVote?.support
    ? 'yes'
    : userVote?.support === false
    ? 'no'
    : '';
  const [selectedOption, setSelectedOption] =
    useState<string>(defaultSelection);
  const [showModal, setShowModal] = useState<boolean>(false);
  const hasVoted: boolean = !!userVote?.account;
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const votingOptions = ['yes', 'no'];

  const pathname = usePathname();
  const urlParts = pathname.split('/');
  const proposalId = urlParts[urlParts.length - 1];
  console.log(proposalId, '=>proposalId');

  const handleOptionChange = (option: string) => {
    if (isConnected) {
      setSelectedOption(option);
    } else {
      toast.error('Connect your wallet first!');
    }
  };

  console.log(eachDAOProposal, '-> current dao');

  const handleVote = async () => {
    setIsVoting(true);
    try {
      if (selectedOption === 'yes') {
        const vote = await voteFor(
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
        const proposals = await getProposal(
          currentDAO.contractAddress,
          proposalId
        );
        for (let key in proposals) {
          if (typeof proposals[key] == 'bigint') {
            proposals[key] = Number(proposals[key]);
          }
        }
        await updateProposalEP(currentDAO.id, proposalId, proposals);
      } else {
        const vote = await voteAgainst(
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
        const proposals = await getProposal(
          currentDAO.contractAddress,
          proposalId
        );
        for (let key in proposals) {
          if (typeof proposals[key] == 'bigint') {
            proposals[key] = Number(proposals[key]);
          }
        }
        await updateProposalEP(currentDAO.id, proposalId, proposals);
      }
      setShowModal(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div>
      {hasVoted && (
        <p className="dark:text-white text-dark">
          You have casted your vote. The result will be shown if the proposal
          reach its quorum
        </p>
      )}
      {!hasVoted && (
        <div className="space-y-5">
          {votingOptions.map((option) => (
            <RadioGroup
              defaultValue={selectedOption}
              value={selectedOption}
              key={option}
              disabled={!!userVote?.account}
              onValueChange={() => handleOptionChange(option)}
              role="button"
            >
              <div
                className="border dark:border-[#292929] p-4 rounded-lg items-center flex justify-between border-[#CCCCCC99]"
                onClick={() => handleOptionChange(option)}
              >
                <Label
                  htmlFor={option}
                  id={option}
                  className="capitalize dark:text-white font-medium text-dark"
                >
                  {option}
                </Label>
                <RadioGroupItem
                  className="rounded-full"
                  id={option}
                  value={option}
                />
              </div>
            </RadioGroup>
          ))}
          <Dialog onOpenChange={setShowModal} open={showModal}>
            <Button
              className="w-full"
              disabled={!selectedOption || !!userVote?.account}
              onClick={handleVote}
              loading={isVoting}
              loadingText="Voting..."
            >
              Vote
            </Button>
            <DialogContent className="dark:bg-[#191919] bg-white">
              <DialogHeader>
                <DialogTitle className="dark:text-white font-medium py-1 text-center text-dark ">
                  <Lottie
                    options={defaultSuccessOption}
                    height={150}
                    width={150}
                  />
                  <p className="-mt-2">Vote Casted</p>
                </DialogTitle>
                <DialogDescription className="py-2 text-center">
                  You have casted your vote. The result will be shown if the
                  proposal reaches its quorum
                </DialogDescription>
              </DialogHeader>
              <Button className="w-full" onClick={() => setShowModal(false)}>
                Done
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default VotingProcess;
