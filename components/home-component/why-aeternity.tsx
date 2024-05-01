import { Heading } from '../headings/heading';
import WhyAEBg from '@/assets/images/why-ae-bg.png';
import WhyAEBg2 from '@/assets/images/why-ae-2-bg.png';
import WhyAEBg3 from '@/assets/images/why-ae-3-bg.png';
import WhyAEBg4 from '@/assets/images/why-ae-4-bg.png';
import { Button } from '../ui/button';

const WhyAeternity = () => {
  return (
    <div className="w-full lg:space-x-5 lg:flex p-8 justify-between backdrop-filter backdrop-blur-md border border-[#65656533] rounded-[20px] bg-gradient-to-r from-[#1E1E1E33] to-[#19191933]">
      <div
        className="w-full lg:w-[40%] lg:h-[450px] bg-contain bg-no-repeat p-12 space-y-5 text-center lg:text-left"
        style={{
          background: 'round',
          backgroundImage: `url(${WhyAEBg.src})`,
          backgroundSize: '100%',
        }}
      >
        <Heading title="Why Æternity Blockchain?" />
        <p className='lg:text-normal text-sm'>Advanced Blockchain Technology.</p>
        <Button className="px-6 lg:px-10">Launch your DAO</Button>
      </div>
      <div className="w-full lg:w-[60%] space-y-4">
        <div className="lg:flex lg:space-x-4 items-center w-full space-y-6 lg:space-y-0">
          <div
            className="bg-contain bg-no-repeat h-[256px] w-full lg:w-1/2 flex flex-col justify-end"
            style={{
              background: 'round',
              backgroundImage: `url(${WhyAEBg2.src})`,
              backgroundSize: '100%',
            }}
          >
            <p className="lg:text-[18px] text-white px-8 pb-7">
              Robust Security & User Friendly Open Source
            </p>
          </div>
          <div
            className="bg-contain bg-no-repeat h-[256px] lg:w-1/2 flex flex-col justify-end"
            style={{
              background: 'round',
              backgroundImage: `url(${WhyAEBg3.src})`,
              backgroundSize: '100%',
            }}
          >
            <p className="lg:text-[18px] text-white px-12 pb-7">
              Efficient & Low Transaction Fees
            </p>
          </div>
        </div>
        <div
          className="bg-contain h-fit py-4 lg:py-0 lg:h-[137px] items-center block lg:flex lg:w-full"
          style={{
            background: 'round',
            backgroundImage: `url(${WhyAEBg4.src})`,
            backgroundSize: '100%',
          }}
        >
          <p className="text-white lg:text-[24px] pl-8 w-1/2">
            Decentralized Scalability & Transparent Governance
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyAeternity;
