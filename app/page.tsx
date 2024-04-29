'use client';
import NavComp from '@/components/home-component/nav-comp';
import Background from '@/assets/images/main-bg.png';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/assets/svgs';
import AEAnimation from '@/assets/animations/ae-animation';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main
        className="min-h-screen bg-contain bg-no-repeat w-full"
        style={{
          background: 'round',
          backgroundImage: `url(${Background.src})`,
        }}
      >
        <NavComp />
        <div className="mx-auto w-3/5 text-center space-y-6 mt-24">
          <h1 className="text-white text-[40px] text-center px-24 font-medium">
            Unlocking the Potential of Decentralization
          </h1>
          <h3 className='font-light text-sm px-10'>
            Step into a world where decisions are made collaboratively,
            transparently, and securely. We're revolutionizing governance on the
            Aeternity blockchain. Join us as we pave the way for decentralized
            decision-making.
          </h3>

          <div className='flex items-center space-x-8 justify-center relative pt-4'>
            <Button className='px-6'>Create DAO</Button>
            <div className='flex items-center space-x-2'>
              <div role='button' className='rounded-full w-[40px] h-[40px] flex justify-center items-center border trans border-[#5E5F62B9] bg-[#1E1E1E] hover:border-l-primary hover:border-l'><PlayIcon /></div>
              <p className='text-sm font-light text-white'>How it works</p>
            </div>

            <AEAnimation className='left-0 top-16' />
          </div>
        </div>
      </main>
    </div>
  );
}
