import { Slider } from '@/components/ui/slider';
import { Clock5, Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ProposalResult = () => {
  return (
    <div className='space-y-6'>
        <div className="rounded-lg dark:bg-[#191919] p-8 space-y-5 bg-white">
            <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
            <h3 className="font-medium text-xl dark:text-white text-dark">Result</h3>
            <p className="text-sm font-light">
                Approved by: <span className="dark:text-white text-dark font-medium">30%</span>
            </p>
            </div>
            <div className="space-y-3">
            <div className="flex justify-between">
                <p className="dark:text-white text-dark font-medium text-base">Yes</p>
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

        <div className="rounded-lg dark:bg-[#191919] p-8 space-y-3 bg-white">
        <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
          <h3 className="font-medium text-xl text-dark dark:text-white">Status</h3>
          <p className="text-sm font-light flex space-x-2">
            <span>
              <Clock5 size={18} />
            </span>
            <span>Time left:</span>{' '}
            <span className="text-dark dark:text-white font-light">22:30:55 G.M.T</span>
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="text-dark dark:text-white font-medium text-sm">03 Jul 2023 </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="dark:text-white text-dark font-medium text-sm">08 Jul 2023</p>
        </div>

        <div className="flex justify-between py-4 border-t border-[#CCCCCC99] dark:border-[#292929] items-center">
          <div className="flex space-x-2 items-center">
            <p className="font-light text-sm text-dark dark:text-white">Quorum</p>
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
          <p className="font-light text-sm text-dark dark:text-white">50%</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalResult;
