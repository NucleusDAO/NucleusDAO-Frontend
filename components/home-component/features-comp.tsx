import { FeaturesIcon } from "@/assets/svgs";
import ProposalCreationChain from '@/assets/icons/feature-chain.png';
import Image from "next/image";

const FeaturesComp = () => {
    return (
        <div className=" w-[65%] mx-auto relative">
            <div className='absolute -top-20 min-w-[350px] border border-[#6565651A] p-4 bg-gradient-to-r from-[#9747FF0D] via-[#0803101A] to-[#1E1E1E1A] flex items-center space-x-6 rounded-lg'>
                <FeaturesIcon />
                <div className="space-y-1"> 
                <p className='text-white'>Proposal Creation</p>
                <p className='text-[#888888] text-sm font-light'>It enables members to propose initiatives.</p>
                </div>
            </div>

            <div className='absolute -top-10 min-w-[350px] -right-[192px] border border-[#6565651A] p-4 bg-gradient-to-r from-[#9747FF0D] via-[#0803101A] to-[#1E1E1E1A] flex items-center space-x-6 rounded-lg'>
                <FeaturesIcon />
                <div className="space-y-1">
                <p className='text-white'>Voting Mechanism</p>
                <p className='text-[#888888] text-sm font-light'>Easily cast votes securely.</p>
                </div>
            </div>

            <div className='absolute bottom-1 min-w-[350px] -left-[230px] border border-[#6565651A] p-4 bg-gradient-to-r from-[#9747FF0D] via-[#0803101A] to-[#1E1E1E1A] flex items-center space-x-6 rounded-lg'>
                <FeaturesIcon />
                <div className="space-y-1">
                <p className='text-white'>DAO Creation</p>
                <p className='text-[#888888] text-sm font-light'>Customize and deploy DAOs</p>
                </div>
            </div>

            <div className='absolute bottom-1 min-w-[350px] -right-[230px] border border-[#6565651A] p-4 bg-gradient-to-r from-[#9747FF0D] via-[#0803101A] to-[#1E1E1E1A] flex items-center space-x-6 rounded-lg'>
                <FeaturesIcon />
                <div className="space-y-1">
                <p className='text-white'>DAO Treasury</p>
                <p className='text-[#888888] text-sm font-light'>DAO has its own Treasury.</p>
                </div>
            </div>
            <Image src={ProposalCreationChain} alt="Proposal creation chain" className="w-[90%] mx-auto mt-24" />
        </div>
    )
};

export default FeaturesComp;