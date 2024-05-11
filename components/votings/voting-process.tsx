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
import {
  IConnectWalletContext,
  IEachProposalView,
  IProposal,
} from '@/libs/types';
import { toast } from 'sonner';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '../animation-options';
import { AppContext } from '@/context/app-context';
import { EachDaoContext } from '@/context/each-dao-context';

interface IVotingProcess {
  currentProposal: {
    id: string;
    votes: { account: string; support: boolean }[];
  };
  setCurrentProposal: (arg: IProposal[]) => void;
}

const VotingProcess = ({
  currentProposal,
  setCurrentProposal,
}: IVotingProcess) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { voteFor, voteAgainst, fetchAllProposals, fetchDAOs } =
    useContext(AppContext);
  const { currentDAO } = useContext(EachDaoContext);
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
  const [eachProposal, setEachProposal] = useState<IEachProposalView | any>(
    null
  );

  const votingOptions = ['yes', 'no'];

  const handleOptionChange = (option: string) => {
    if (isConnected) {
      setSelectedOption(option);
    } else {
      toast.error('Connect your wallet first!');
    }
  };

  const handleVote = async () => {
    setIsVoting(true);
    try {
      if (selectedOption === 'yes') {
        const proposal = await voteFor(
          Number(currentProposal.id),
          currentDAO.contractAddress
        );
        await setShowModal(true);
        setEachProposal(proposal);
      } else {
        const proposal = await voteAgainst(
          Number(currentProposal.id),
          currentDAO.contractAddress
        );
        await setShowModal(true);
        setEachProposal(proposal);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsVoting(false);
    }
  };

  const handleDone = async () => {
    setIsLoading(true);
    try {
      fetchAllProposals();
      fetchDAOs();
      // const proposal = await getProposal(
      //   currentDAO.contractAddress,
      //   Number(currentProposal.id)
      // );
      setCurrentProposal(eachProposal);
      setShowModal(false);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
              <Button
                className="w-full"
                onClick={handleDone}
                loading={isLoading}
              >
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
