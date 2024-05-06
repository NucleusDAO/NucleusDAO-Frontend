import LegacyLogo from '@/assets/logos/legacy.png';
import Image from 'next/image';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import VoteIcon from '@/assets/icons/voteIcon.png';
import { Separator } from '../ui/separator';
import { Clock4 } from 'lucide-react';
import { EachStatus } from './data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { encodeURI, getDuration } from '@/libs/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { useContext } from 'react';
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
  daoId: string;
  organisation: string;
}

const ProposalCard = ({
  description,
  wallet,
  totalVote,
  duration,
  status,
  type,
  id,
  daoId,
  organisation,
}: IProposalCard) => {
  const { user } = useContext<any>(ConnectWalletContext);
  const { address } = user;
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  console.log(daoId, '-> organisation');
  console.log(pathname, '-> pathname');
  console.log(pathname === PROPOSALS_URL, '-d');
  // encodeURI(pathname, id || daoId)
  return (
    <Link
      href={`${pathname}/${id}${
        pathname === PROPOSALS_URL ? `?dao=${daoId}` : ''
      }`}
    >
      <div
        className="dark:bg-gradient-to-r max-h-[40vh] dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg cursor-pointer bg-white"
        role="tablist"
      >
        <div className="flex rounded-l space-x-2">
          <div className="dark:bg-[#1E1E1E] bg-[#EEEEEE] p-3 rounded-tl-lg rounded-bl-lg">
            <Image src={LegacyLogo} alt="legacy" width={isDesktop ? 32 : 24} />
          </div>
          <div className="h- w-[1px] bg-[#292929]" />
          <div className="p-2 md:p-4 space-y-6 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 items-center">
                  <Image
                    src={RoundedIcon}
                    alt="proposal title"
                    width={isDesktop ? 40 : 20}
                    height={isDesktop ? 40 : 20}
                  />
                  <div className="space-y-1">
                    <p className="text-defaultText text-xs md:text-base">
                      Proposal Type
                    </p>
                    <h3 className="dark:text-white capitalize text-dark font-medium text-sm md:text-lg w-[90%]">
                      {
                        proposalLists.find(
                          (proposal: { type: string }) => proposal.type === type
                        )?.title
                      }
                    </h3>
                  </div>
                </div>
                <div>{EachStatus[status]}</div>
              </div>
              <p className="text-defaultText text-xs md:text-sm">
                {description}
              </p>
            </div>
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between text-[10px] md:text-xs dark:text-[#CCCCCCBF] text-defaultText">
                <div className="flex space-x-2 items-center">
                  <img
                    src={
                      address
                        ? `https://avatars.z52da5wt.xyz/${address}`
                        : RoundedIcon.src
                    }
                    alt="legacy"
                    width={isDesktop ? 22 : 14}
                    height={isDesktop ? 22 : 14}
                  />
                  <p>{wallet}</p>
                </div>
                <div className="flex space-x-1 md:space-x-4">
                  <div className="flex items-center space-x-2 text-defaultText">
                    <Clock4 size={isDesktop ? 18 : 9} color="#444444" />
                    <p>{duration}</p>
                  </div>
                  <div className="flex text-xs md:text-sm items-center space-x-2 text-defaultText">
                    <Image
                      src={VoteIcon}
                      alt="legacy"
                      width={isDesktop ? 16 : 12}
                    />
                    <p className="dark:text-white text-dark">{totalVote}</p>
                    <p>votes</p>
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
