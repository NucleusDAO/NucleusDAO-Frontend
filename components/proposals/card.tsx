'use client';
import Image from 'next/image';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import VoteIcon from '@/assets/icons/voteIcon.png';
import { Separator } from '../ui/separator';
import { Clock4 } from 'lucide-react';
import { EachStatus } from './data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { capitalizeFirstLetter, getTimeDifference } from '@/libs/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect, useState } from 'react';
import { proposalLists } from '@/config/dao-config';
import { PROPOSALS_URL } from '@/config/path';

interface IProposalCard {
  description: string;
  wallet: string;
  totalVote: string;
  duration: string;
  status: string;
  type: string;
  id: string;
  proposer: string;
  daoId: string;
  endTime: string;
  daoImage: string;
  organisation: string;
}

const ProposalCard = ({
  description,
  proposer,
  totalVote,
  status,
  type,
  id,
  daoId,
  endTime,
  daoImage,
}: IProposalCard) => {
  const [countdownString, setCountdownString] = useState<string>('');
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    getTimeDifference(endTime, setCountdownString);
  }, [endTime]);

  return (
    <Link
      href={`${pathname}/${id}${
        pathname === PROPOSALS_URL ? `?dao=${daoId}` : ''
      }`}
    >
      <div
        className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg cursor-pointer bg-white"
        role="tablist"
      >
        <div className="flex rounded-l space-x-">
          <div className="dark:bg-[#1E1E1E] bg-[#EEEEEE] p-3 rounded-tl-lg rounded-bl-lg">
            <img
              src={daoImage}
              alt="legacy"
              width={isDesktop ? 32 : 24}
              className="rounded-full object-cover"
            />
          </div>
          <div className="max-h-[300px] w-[1px] bg-[#292929]" />
          <div className="p-2 md:p-4 space-y-6 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                  <p className="text-defaultText text-xs">Proposal Type</p>
                  <h3 className="dark:text-white capitalize text-dark font-medium text-sm md:text-lg multiline-truncate text-ellipsis overflow-hidden">
                    {
                      proposalLists.find(
                        (proposal: { type: string }) => proposal.type === type
                      )?.title
                    }
                  </h3>
                </div>

                <div>{EachStatus[status]}</div>
              </div>
              <p className="text-defaultText multiline-truncate text-ellipsis overflow-hidden h-9 text-xs md:text-sm min-h-[60px] max-h-[60px]">
                {capitalizeFirstLetter(description)}
              </p>
            </div>
            <div className="space-y-3">
              <Separator />
              <div className="flex items-center justify-between text-[10px] md:text-xs dark:text-[#CCCCCCBF] text-defaultText">
                <div className="flex space-x-2 items-center">
                  <img
                    src={
                      proposer
                        ? `https://avatars.z52da5wt.xyz/${proposer}`
                        : RoundedIcon.src
                    }
                    alt="legacy"
                    width={isDesktop ? 22 : 14}
                    height={isDesktop ? 22 : 14}
                  />
                  <p>{proposer}</p>
                </div>
                <div className="flex space-x-1 md:space-x-4">
                  <div className="flex items-center space-x-2 text-defaultText">
                    <Clock4 size={isDesktop ? 18 : 9} color="#444444" />
                    <p>{countdownString}</p>
                  </div>
                  <div className="flex text-xs md:text-sm items-center space-x-1 text-defaultText">
                    <Image
                      src={VoteIcon}
                      alt="legacy"
                      width={isDesktop ? 16 : 12}
                    />
                    <p className="dark:text-white text-dark">{totalVote}</p>
                    <p>vote(s)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;
