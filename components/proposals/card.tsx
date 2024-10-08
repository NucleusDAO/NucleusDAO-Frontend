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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LinkIcon } from '@/assets/svgs';

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
  daoName: string;
  organisation: string;
  refetchData: any;
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
  daoName,
  daoImage,
  refetchData,
}: IProposalCard) => {
  const [countdownString, setCountdownString] = useState<string>('');
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const domainName = typeof window !== 'undefined' && window.location.origin;
  const url = `${domainName}/daos/${daoId}`;
  useEffect(() => {
    getTimeDifference(endTime, setCountdownString, refetchData);
  }, [endTime]);

  return (
    <Link
      href={`${pathname}/${id}${
        pathname === PROPOSALS_URL ? `?dao=${daoId}` : ''
      }`}
      className="w-full"
    >
      <div
        className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg cursor-pointer bg-white"
        role="tablist"
      >
        <div className="flex rounded-l py-4 lg:p-4 space-x-5 justify-between w-full">
          <div className="px-4 md:p-0 space-y-2 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-4 w-[100%]">
                  <div className="lg:flex space-y-4 lg:space-y-2 justify-between items-center w-full lg:space-x-0">
                    <div className="flex space-x-2 items-center">
                      <Avatar className="w-8 h-8 rounded-sm block">
                        <AvatarImage
                          src={daoImage}
                          className="rounded-sm object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="dark:text-white capitalize text-dark font-medium text-sm md:text-normal truncate text-ellipsis overflow-hidden">
                          {daoName}
                        </p>
                        <Link href={url}>
                          <div className="space-x-1 flex items-center">
                            <p className="text-xs font-light text-defaultText text-ellipsis overflow-hidden">
                              {url}
                            </p>
                            <LinkIcon className="text-[#DCC5FD] dark:text-[#292D32] lg:flex hidden" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div>{EachStatus[status]}</div>
                  </div>

                  <h3 className="dark:text-white capitalize text-dark font-medium text-sm md:text-lg truncate text-ellipsis overflow-hidden h-6 min-h-[24px] max-h-[24px]">
                    {
                      proposalLists.find(
                        (proposal: { type: string }) => proposal.type === type
                      )?.title
                    }
                  </h3>
                </div>
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
                    alt="Logo"
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
