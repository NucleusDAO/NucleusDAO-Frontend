import { LinkIcon, PeopleIcon, ProposalIcon2 } from '@/assets/svgs';
import { VIEW_DAO_URL } from '@/config/path';
import { encodeURI } from '@/libs/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface IDaoCard {
  organisation: string;
  orgIcon: ReactNode;
  description: string;
  activeProposal: string;
  activeMember: string;
  url: string;
}

const DaoCard = ({
  organisation,
  orgIcon,
  description,
  activeProposal,
  activeMember,
  url,
}: IDaoCard) => {
  return (
    <div className="dark:bg-[#191919] bg-white p-5 rounded-lg space-y-7">
      <div className="flex space-x-4 items-center pb-7">
        <div>{orgIcon}</div>
        <div className="space-y-1">
          <Link href={encodeURI(VIEW_DAO_URL, organisation, 'dashboard')}>
            <h3 className="dark:text-white text-dark font-medium text-[22px]">
              {organisation}
            </h3>
          </Link>
          <Link href={url} target="_blank">
            <div className="space-x-1 flex items-center">
              <p className="text-xs font-light text-defaultText">{url}</p>
              <LinkIcon className='text-[#DCC5FD] dark:text-[#292D32]' />
            </div>
          </Link>
        </div>
      </div>
      <Link href={encodeURI(VIEW_DAO_URL, organisation, 'dashboard')}>
        <div className='space-y-7'>
          <div className="text-defaultText">
            <p className="font-light text-sm">{description}</p>
          </div>
          <div className="flex justify-between items-center pt-6 border-t dark:border-[#1E1E1E] border-[#CCCCCC99] text-sm">
            <div className="flex items-center space-x-2">
              <PeopleIcon />
              <p className="dark:text-white text-dark">
                {activeMember}
                <span className="text-defaultText ml-2 text-sm">Members</span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
               
              <ProposalIcon2 />
              <p className="dark:text-white text-dark">
                {activeProposal}
                <span className="text-defaultText ml-2 text-sm">Proposals</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DaoCard;
