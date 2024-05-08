import { PlayIcon } from '@/assets/svgs';
import { activities, cn } from '@/libs/utils';
import { SquareMousePointer } from 'lucide-react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const HowItWorks = () => {
  const [currentPlay, setCurrentPlay] = useState<number>(0);

  return (
    <div className="w-full text-center lg:text-left p-8 space-y-8 lg:space-y-10 justify-between backdrop-filter backdrop-blur-md border border-[#65656533] rounded-[20px] bg-gradient-to-r from-[#1E1E1E33] to-[#19191933]">
      <div className="lg:flex w-full lg:space-x-16 space-y-8 lg:space-y-0">
        <div className="lg:w-[12%] items-end w-full mx-auto lg:mx-0 lg:block space-x-6 lg:space-x-0 flex space-y-6 text-sm">
          {activities.map((each, index) => (
            <div
              role="button"
              className={cn(
                'border hover:border-primary hover:text-primary text-[#888888] font-light trans border-[#656565B2] flex items-center space-x-3 bg-gradient-to-r from-[#444444] via-[#292929B2] to-[#44444433] py-1.5 px-2 rounded-[25px]',
                currentPlay === index && 'text-primary border-primary'
              )}
              key={each.title}
              onClick={() => setCurrentPlay(index)}
            >
              <div
                className={cn(each.color, 'w-[20px] h-[20px] rounded-full')}
              ></div>
              <p className="">{each.title}</p>
            </div>
          ))}
        </div>
        <div className="border space-y-4 p-8 rounded-[20px] border-[#656565B2] h-fit  w-full text-left">
          <h1 className="text-[28px] text-white font-light">
            {activities[currentPlay].options.title}
          </h1>
          <ul className="space-y-6 font-light">
            {activities[currentPlay].options.instruction.map((instruction) => (
              <li
                className="flex space-x-4 items-start lg:text-normal text-sm"
                key={instruction}
              >
                <div className="w-4 h-4">
                  <SquareMousePointer size={16} />
                </div>
                <p>{instruction}</p>
              </li>
            ))}
          </ul>

          {/* <ReactPlayer
            url={currentPlay.url}
            width="100%"
            controls
            playIcon={
              <div className="border border-primary flex justify-center items-center rounded-full w-[50px] h-[50px] bg-[#1E1E1E80]">
                <PlayIcon />
              </div>
            }
            light={
              'https://res.cloudinary.com/djn4tphfy/image/upload/v1714469006/video-layer_zlcfmd.png'
            }
            style={{ borderRadius: '4px' }}
            playing
          /> */}
        </div>
      </div>
      <div className="lg:flex justify-between lg:space-x-16 items-start space-y-4 lg:space-y-0">
        <h2 className="text-white text-[28px] lg:text-[36px] leading-[1.2]">
          The Future of Decentralized Governance
        </h2>
        <p className="text-[#888888] font-light text-sm">
          Engage in our governance process by submitting proposals, voting on
          decisions, and contributing to community discussions.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
