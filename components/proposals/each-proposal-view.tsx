import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Slider } from '@/components/ui/slider';
import { Clock5, Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import VotingProcess from '../votings/voting-process';
import { VoteIcon } from '@/assets/svgs';
import AllVoters from '../votings/all-voters';

const EachProposalView = () => {
    const voteStatus: string = 'Active'
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#292929] pb-4">
        <h2 className="text-white font-medium text-xl">Proposal</h2>
        <div className="flex space-x-3 bg-[#191919] rounded-lg p-2 items-center text-sm">
          <div className="p-2 text-primary rounded-lg bg-[#1E1E1E] px-4">
            Result
          </div>
          <p>Information</p>
        </div>
      </div>

      <h1 className="text-white font-medium text-3xl">Brand Identity Change</h1>
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
        <Button>Read full proposal</Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="rounded-lg bg-[#191919] p-8 space-y-5">
            <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
              <h3 className="font-medium text-xl text-white">Result</h3>
              <p className="text-sm font-light">
                Approved by: <span className="text-white font-medium">30%</span>
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-white font-medium text-base">Yes</p>
                <p className="text-defaultText font-light text-base">25%</p>
              </div>
              <Slider
                defaultValue={[25]}
                max={100}
                step={1}
                thumbClassName="hidden"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between pt-4">
                <p className="text-white font-medium text-base">No</p>
                <p className="text-defaultText font-light text-base">3%</p>
              </div>
              <Slider
                defaultValue={[3]}
                max={100}
                step={1}
                thumbClassName="hidden"
              />
            </div>
          </div>

          <div className="rounded-lg bg-[#191919] p-8 space-y-3">
            <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
              <h3 className="font-medium text-xl text-white">Status</h3>
              <p className="text-sm font-light flex space-x-2">
                <span>
                  <Clock5 size={18} />
                </span>
                <span>Time left:</span>{' '}
                <span className="text-white font-light">22:30:55 G.M.T</span>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-defaultText font-light text-sm">Start Date</p>
              <p className="text-white font-medium text-sm">03 Jul 2023 </p>
            </div>

            <div className="flex justify-between pt-4">
              <p className="text-defaultText font-light text-sm">End Date</p>
              <p className="text-white font-medium text-sm">08 Jul 2023</p>
            </div>

            <div className="flex justify-between py-4 border-t border-[#292929] items-center">
              <div className="flex space-x-2 items-center">
                <p className="font-light text-sm text-white">Quorum</p>
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
              <p className="font-light text-sm text-white">50%</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="rounded-lg bg-[#191919] p-8 space-y-4">
            <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
              <h3 className="font-medium text-xl text-white">Cast a vote</h3>
              <div className='font-light text-sm text-white bg-[#1E1E1E] rounded-lg px-3 py-1.5' role="status">{voteStatus}</div>
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
                <span className='text-white'>100</span>{' '}
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
