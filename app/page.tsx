'use client';
import NavComp from '@/components/home-component/nav-comp';
import Background from '@/assets/images/main-bg.png';
import SectionTwoBackground from '@/assets/images/section-2-bg.png';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/assets/svgs';
import AEAnimation from '@/assets/animations/ae-animation';
import Lottie from 'react-lottie';
import { defaultProposalOption } from '@/components/animation-options';
import NucleusDAOSample from '@/assets/images/nucleus-dao-sample.png'
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <main
        className="bg-contain bg-no-repeat w-full h-[105vh]"
        style={{
          background: 'round',
          backgroundImage: `url(${Background.src})`,
        }}
      >
        <NavComp />
        <div className="mx-auto w-3/5 text-center space-y-4 mt-10">
          <h1 className="text-white text-[40px] text-center px-24 font-medium">
            Unlocking the Potential of Decentralization
          </h1>
          <h3 className="font-light text-normal px-10">
            Step into a world where decisions are made collaboratively,
            transparently, and securely. We're revolutionizing governance on the
            Aeternity blockchain. Join us as we pave the way for decentralized
            decision-making.
          </h3>

          <div className="flex items-center space-x-8 justify-center relative pt-2">
            <Button className="px-6">Create DAO</Button>
            <div className="flex items-center space-x-2">
              <div
                role="button"
                className="rounded-full w-[40px] h-[40px] flex justify-center items-center border trans border-[#5E5F62B9] bg-[#1E1E1E] hover:border-l-primary hover:border-l"
              >
                <PlayIcon />
              </div>
              <p className="text-sm font-light text-white">How it works</p>
            </div>

            <AEAnimation className="left-0 top-20" />
          </div>
        </div>
        <div className="text-center mx-auto">
          <Lottie options={defaultProposalOption} height={320} width={420} />
        </div>
      </main>
      <section
        className="bg-cover bg-no-repeat w-full min-h-[140vh] p-24 space-y-8"
        style={{
          // background: 'round',
          backgroundImage: `url(${SectionTwoBackground.src})`,
        }}
      >
        <div className="border border-[#5E5F62B9] bg-gradient-to-r from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]" role='heading'>
        <h2>About NucleusDAO</h2>
        </div>
        <div className='w-[65%] space-y-2 pb-4'>
          <h1 className="text-white text-[40px] text-left font-medium leading-[1.3]">
          Discover NucleusDAO: Revolutionizing Decentralized Governance
            </h1>
            <p className='font-light text-normal'>NucleusDAO embraces true autonomy by empowering communities to create DAOs with unparalleled transparency, user-centric design, and fair decision-making. We prioritize seamless participation and collaboration, ensuring every voice matters in shaping the future.</p>
        </div>

        <div className='border border-[#656565] py-8 px-14 rounded-[20px] bg-gradient-to-r from-[#1E1E1E33] to-[#19191933] flex justify-between items-center'>
          <div className='space-y-8 pl-16'>
            <h2 className='text-white font-medium text-[28px] w-[60%]'>Launch your DAO with an Inclusive Builder</h2>
            <Button className='px-8 h-9'>Launch your DAO</Button>
          </div>
          <Image src={NucleusDAOSample} alt="Nucleus DAO Template" width={450} />
        </div>
      </section>
    </div>
  );
}

