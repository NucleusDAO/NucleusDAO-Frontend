'use client';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import VotingProcess from '../votings/voting-process';
import { VoteIcon } from '@/assets/svgs';
import AllVoters from '../votings/all-voters';
import { ReactNode, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProposalResult from './proposal-result';
import ProposalInfo from './proposal-info';


interface IEachTabView {
  [key: string]: ReactNode;
}

interface IEachProposalView {
  tabs: string[]
}

const EachProposalView = ({ tabs }: IEachProposalView) => {
  const [showFullProposal, setShowFullProposal] = useState<boolean>(false);
  const voteStatus: string = 'Active';
  const searchParams = useSearchParams();

  const currentTab: string = searchParams.get('q') || tabs[0];

  const tabViews: IEachTabView = {
    Result: <ProposalResult />,
    Information: <ProposalInfo />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-white font-medium text-3xl pt-6">
        Brand Identity Change
      </h1>
      <div className="flex space-x-3 items-center">
        <p className="font-light text-sm text-[#888888]">Published by</p>
        <Image src={RoundedIcon} alt="logo" width={20} height={20} />
        <p className="font-light text-sm text-white">9xfDAO...ntY897</p>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-light text-defaultText">
          Making a change of brand identity and UI features that can enhance the
          usability and functionality of Legacy. This features can lead to a
          more engaging user experience, increased user engagement, improved
          communication of value proposition, brand cohesion, differentiation in
          the market, and long-term scalability.
        </p>
        {!showFullProposal && (
          <Button onClick={() => setShowFullProposal(true)}>
            Read full proposal
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-8">
          {showFullProposal && (
            <div className="text-sm text-defaultText font-light trans space-y-3">
              <p>
                Refreshed Branding: Start by evaluating Legacy's existing brand
                identity and considering if any updates or refinements are
                necessary. This may involve updating the logo, color palette,
                typography, and overall visual style to ensure they align with
                the product's values and target audience. User-Centric Design:
                Focus on creating a user-centric design by understanding the
                needs and preferences of Legacy's target users. Conduct user
                research and usability testing to identify pain points, gather
                feedback, and iterate on the UI features accordingly. Would like
                to propose to change the brand identity of Legacy.
              </p>
              <Button onClick={() => setShowFullProposal(false)}>
                Show less
              </Button>
            </div>
          )}
          <div>
            {tabViews[currentTab]}
          </div>
        </div>
        <div className="space-y-8">
          <div className="rounded-lg bg-[#191919] p-8 space-y-4">
            <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
              <h3 className="font-medium text-xl text-white">Cast a vote</h3>
              <div
                className="font-light text-sm text-white bg-[#1E1E1E] rounded-lg px-3 py-1.5"
                role="status"
              >
                {voteStatus}
              </div>
            </div>
            <VotingProcess />
          </div>

          <div className="rounded-lg bg-[#191919] p-8 space-y-4">
            <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
              <h3 className="font-medium text-xl text-white">Voters</h3>
              <p className="text-sm flex space-x-1.5">
                <span>
                  <VoteIcon />
                </span>
                <span className="text-white">100</span>{' '}
                <span className="text-defaultText">votes</span>
              </p>
            </div>
            <AllVoters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProposalView;