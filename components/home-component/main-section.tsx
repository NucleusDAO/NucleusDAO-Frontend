'use client';
import { PlayIcon } from '@/assets/svgs';
import { Heading } from '../headings/heading';
import { Button } from '../ui/button';
import AEAnimation from '@/assets/animations/ae-animation';
import React, { useEffect, useState } from 'react';
import { cn } from '@/libs/utils';
// import { DASHBOARD_URL } from '@/config/path';
import Link from 'next/link';

const MainSection = () => {
  const [contentIndex, setContentIndex] = useState<number>(0);
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

  useEffect(() => {
    // Set up an interval to change content every 5 seconds
    const intervalId = setInterval(() => {
      setContentIndex((prevIndex) => (prevIndex + 1) % mainContent.length);
    }, 15000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // absolute bottom-0 lg:bottom-0 lg:top-0  opacity-10
  return (
    <div className="mx-auto w-full lg:w-[60%] text-center space-y-8 lg:mt-14 pt-32 lg:pt-20 relative">
      <div className="w-full min-h-[38px] space-y-4">
        <Heading
          // title={mainContent[contentIndex].title}
          title="Empowering Decentralised Governance"
          className={cn(
            'px-6 lg:px-24 text-[28px] lg:text-[48px] lg:text-center font-extrabold',
            contentIndex === 1 && 'px-6 lg:px-10'
          )}
        />
        <h3 className="font-light text-sm lg:text-[18px] leading-[30px] px-6 lg:px-20">
          {/* {mainContent[contentIndex].description} */}
          Build a customizable, transparent organization for your community with
          NucleusDAO on the æternity blockchain.
        </h3>
        <React.Fragment>
          <div className="flex items-center space-x-8 justify-center relative pt-2">
            <Link href={'#join'}>
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

      {/* <div className="w-full min-h-[38px] main-animate-fade-in-out space-y-4">
        <Heading
          title={mainContent[contentIndex].title}
          className={cn(
            'px-6 lg:px-24 lg:text-center',
            contentIndex === 1 && 'px-6 lg:px-10'
          )}
        />
        <h3 className="font-light text-sm lg:text-normal px-6 lg:px-10">
          {mainContent[contentIndex].description}
        </h3>
        <React.Fragment>
          <div className="flex items-center space-x-8 justify-center relative pt-2">
            <Link href={'#join'}>
              <Button className="px-6">{mainContent[contentIndex].cta}</Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div
                role="button"
                className="rounded-full w-[40px] h-[40px] flex justify-center items-center border trans border-[#5E5F62B9] bg-[#1E1E1E] hover:border-l-primary hover:border-l"
              >
                <PlayIcon />
              </div>
              <p className="text-sm font-light text-white">How it works</p>
            </div>

            <AEAnimation className="left-0 top-20 w-[56px]" />
          </div>
        </React.Fragment>
      </div> */}
    </div>
  );
};

export default MainSection;
