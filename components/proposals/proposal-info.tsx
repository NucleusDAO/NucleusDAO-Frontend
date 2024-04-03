import Logo from '@/assets/logos/legacy.png';
import { LinkIcon } from '@/assets/svgs';
import Image from 'next/image';
import Link from 'next/link';

const ProposalInfo = () => {
  return (
    <div className="rounded-lg dark:bg-[#191919] p-8 space-y-5 bg-white">
      <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
        <h3 className="font-medium text-lg dark:text-white text-dark">Information</h3>
      </div>
      <div className="border-b dark:border-[#1E1E1E] pb-4 space-y-6 border-[#CCCCCC99]">
        <div className="flex items-center justify-between">
          <p className="dark:text-white text-dark font-medium text-base">Identity</p>
          <Image src={Logo} alt="proposal identity logo" width={18} />
        </div>
        <h3 className="font-medium text-lg dark:text-white text-dark">Voting System</h3>
      </div>

      <div className="text-base  border-b dark:border-[#1E1E1E] pb-4 space-y-6 border-[#CCCCCC99]">
        <div className="flex items-center justify-between">
          <p className="text-defaultText">Strategy</p>
          <p className="dark:text-white text-dark">1 Wallet Voting</p>
        </div>
        <h3 className="font-medium text-lg dark:text-white text-dark">Status</h3>
      </div>

      <div className="border-b dark:border-[#1E1E1E] pb-4 border-[#CCCCCC99]">
        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="dark:text-white font-medium text-sm text-dark">
            03 Jul 2023 22:30:55 G.M.T
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="dark:text-white font-medium text-sm text-dark">
            08 Jul 2023 22:30:55 G.M.T
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="dark:text-white text-dark">Link</p>
        <Link href="#" className='flex space-x-2 items-center'>
            <p className='font-light text-xs '>DAO</p>
          <LinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProposalInfo;
