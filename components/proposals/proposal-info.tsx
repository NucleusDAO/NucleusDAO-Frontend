import Logo from '@/assets/logos/legacy.png';
import { LinkIcon } from '@/assets/svgs';
import Image from 'next/image';
import Link from 'next/link';

const ProposalInfo = () => {
  return (
    <div className="rounded-lg bg-[#191919] p-8 space-y-5">
      <div className="flex justify-between border-b border-[#1E1E1E] pb-4 items-center">
        <h3 className="font-medium text-lg text-white">Information</h3>
      </div>
      <div className="border-b border-[#1E1E1E] pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-white font-medium text-base">Identity</p>
          <Image src={Logo} alt="proposal identity logo" width={18} />
        </div>
        <h3 className="font-medium text-lg text-white">Voting System</h3>
      </div>

      <div className="text-base  border-b border-[#1E1E1E] pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-defaultText">Strategy</p>
          <p className="text-white">1 Wallet Voting</p>
        </div>
        <h3 className="font-medium text-lg text-white">Status</h3>
      </div>

      <div className="border-b border-[#1E1E1E] pb-4">
        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="text-white font-medium text-sm">
            03 Jul 2023 22:30:55 G.M.T
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="text-white font-medium text-sm">
            08 Jul 2023 22:30:55 G.M.T
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-white">Link</p>
        <Link href="#" className='flex space-x-2 items-center'>
            <p className='font-light text-xs '>DAO</p>
          <LinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProposalInfo;
