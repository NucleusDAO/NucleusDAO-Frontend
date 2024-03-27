import LegacyLogo from '@/assets/logos/legacy.png';
import Image from 'next/image';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import VoteIcon from '@/assets/icons/voteIcon.png';
import { Separator } from '../ui/separator';
import { Clock4 } from 'lucide-react';
import { ReactNode } from 'react';
import { EachStatus } from './data';

interface IProposalCard {
  description: string;
  wallet: string;
  totalVote: string;
  duration: string;
  status: string;
  type: string;
}

const ProposalCard = ({
  description,
  wallet,
  totalVote,
  duration,
  status,
  type,
}: IProposalCard) => {

  return (
    <div className="bg-[#191919] rounded-lg">
      <div className="flex rounded-l space-x-2">
        <div className="bg-[#1E1E1E] p-3 rounded-tl-lg rounded-bl-lg">
          <Image src={LegacyLogo} alt="legacy" width={32} />
        </div>
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 items-center">
                <Image
                  src={RoundedIcon}
                  alt="proposal title"
                  width={40}
                  height={40}
                />
                <div className="space-y-1">
                  <p className="text-defaultText">Proposal Type</p>
                  <h3 className="text-white font-medium text-lg">{type}</h3>
                </div>
              </div>
              <div>{EachStatus[status]}</div>
            </div>
            <p className="text-defaultText pt-2 text-sm">{description}</p>
          </div>
          <div className="space-y-4">
            <Separator />
            <div className="flex items-center justify-between text-xs text-[#CCCCCCBF]">
              <div className="flex space-x-2 items-center">
                <Image src={RoundedIcon} alt="legacy" width={22} />
                <p>{wallet}</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-defaultText">
                  <Clock4 size={18} color="#444444" />
                  <p>{duration}</p>
                </div>
                <div className="flex items-center space-x-2 text-defaultText">
                  <Image src={VoteIcon} alt="legacy" width={16} />
                  <p className="text-white">{totalVote}</p>
                  <p>votes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
