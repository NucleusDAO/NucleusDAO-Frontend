import { FeaturesIcon } from '@/assets/svgs';
import Image from 'next/image';

import React, { useState } from 'react';
import { cn } from '@/libs/utils';
import { content, contentChain } from '@/config/home-config';

const FeaturesComp = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleMosueEnter = (id: number) => {
    setCurrentIndex(id);
  };

  return (
    <React.Fragment>
      <div className="lg:w-[70%] mx-auto relative space-y-2 lg:space-y-0">
        {contentChain.map((each, index) => (
          <div
            key={`${each.title}-${index}`}
            role="button"
            className={cn(
              'lg:absolute flex items-center space-x-6 rounded-lg min-w-[350px] border border-[#6565651A] p-4 bg-gradient-to-r from-[#9747FF0D] via-[#0803101A] to-[#1E1E1E1A]'
            )}
            style={{
              right: each.right || '',
              left: each.left || '',
              top: each.top || '',
              bottom: each.bottom || '',
            }}
            onMouseEnter={() => handleMosueEnter(index)}
            data-aos="zoom-out-down"
          >
            <FeaturesIcon />
            <div className="space-y-1">
              <p className="text-white">{each.title}</p>
              <p className="text-[#888888] text-sm font-light">
                {each.description}
              </p>
            </div>
          </div>
        ))}

        <Image
          src={contentChain[currentIndex].chain}
          alt="Proposal creation chain"
          className="w-[90%] mx-auto lg:mt-24 trans"
          data-aos="zoom-out-down"
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${content[currentIndex].background.src})`,
        }}
        className="w-[350px] mx-auto lg:h-[400px] h-[300px] bg-contain bg-no-repeat relative mt-2 trans"
        data-aos="zoom-out-down"
      >
        <div className="absolute bottom-20 px-6 space-y-2">
          {content[currentIndex].heading && (
            <div className="flex bg-gradient-to-r from-[#1E1E1E] to-[#252525] w-fit px-8 py-4 mx-auto rounded-lg items-center space-x-2">
              <div className="border border-primary rounded-full w-5 h-5 flex justify-center items-center text-sm text-primary p-2">
                {currentIndex + 1}
              </div>
              <p className="text-white">{content[currentIndex].heading}</p>
            </div>
          )}
          <h3 className="text-white px-4">{content[currentIndex].title}</h3>
          <p className="text-sm px-4 font-light">
            {content[currentIndex].description}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeaturesComp;
