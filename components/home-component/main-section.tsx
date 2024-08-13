'use client';
import { PlayIcon } from '@/assets/svgs';
import AEAnimation from '@/assets/animations/ae-animation';
import React from 'react';
import Link from 'next/link';
import { FlipWords } from '../ui/flip-words';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/use-media-query';
import AELogo from '@/assets/icons/ae-icon.png';
import { toast } from 'sonner';

const MainSection = () => {
  const isDesktop = useMediaQuery('(min-width: 1068px)');
  const words = ['Decentralized', 'Future-Driven', 'Potential'];
  const mainContent: { title: string; description: string; cta: string }[] = [
    {
      title: 'Unlocking the Potential of Decentralization',
      description:
        "Step into a world where decisions are made collaboratively, transparently, and securely.  We're revolutionizing governance on the Aeternity blockchain. Join us as we pave the way for decentralized decision-making.",
      cta: 'Create DAO',
    },
    {
      title:
        'Experience decentralized governance reimagined with NucleusDAO on the Æternity blockchain',
      description:
        'Step into a world where decisions are made collaboratively, transparently, and securely. were revolutionizing governance on the Aeternity blockchain. Join us as we pave the way for decentralized decision-making.',
      cta: 'Launch your DAO',
    },
    {
      title: 'Welcome to the Future of Governance Driving Change',
      description:
        'Join us as we pave the way for decentralized decision-making that empowers every voice in our community. Explore, participate, and shape the future with us.',
      cta: 'Build DAO',
    },
  ];

  return (
    <div className="mx-auto w-full lg:w-[60%] text-center lg:space-y-8 lg:mt-14 pt-32 lg:pt-28 relative">
      <div
        className={
          'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute lg:h-[52px] h-[40px] w-[40px] xl:w-[52px] top-20 lg:top-28 right-10'
        }
      >
        <div className="bg-gradient-to-r h-full w-full from-primary via-primary flex items-center justify-center to-primary shadow-[inset_0px_0px_6px_6px_rgba(0,0,0,0.3)] animate-fade-in-out">
          <Image
            width={isDesktop ? 32 : 22}
            height={isDesktop ? 32 : 22}
            src={AELogo}
            alt="aelogo"
          />
        </div>
      </div>
      <div className="w-full min-h-[38px] space-y-2">
        <h1 className="px-6 lg:px-24 text-[28px] lg:text-[48px] lg:text-center font-medium text-white">
          Empowering
          <span>
            <FlipWords
              words={words}
              className="text-[28px] lg:text-[48px] lg:text-center font-medium"
            />
          </span>
          <span>Governance</span>
        </h1>

        <h3 className="font-light text-sm lg:text-[18px] lg:leading-[30px] px-6 lg:px-20">
          Build a customizable, transparent organization for your community with
          NucleusDAO on the æternity blockchain.
        </h3>
        <React.Fragment>
          <div className="flex items-center space-x-8 justify-center relative pt-2">
            <Link href="https://app.nucleusdao.com/" target="_blank">
              <Button className="px-6">Join Now</Button>
            </Link>
            <Link href="#howItWorks">
              <div className="flex items-center space-x-2">
                <div
                  role="button"
                  className="rounded-full w-[40px] h-[40px] flex justify-center items-center border trans border-[#5E5F62B9] bg-[#1E1E1E] hover:border-l-primary hover:border-l"
                >
                  <PlayIcon />
                </div>
                <p className="text-sm font-light text-white">How it works</p>
              </div>
            </Link>

            <AEAnimation className="left-0 top-20 w-[56px]" />
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default MainSection;
