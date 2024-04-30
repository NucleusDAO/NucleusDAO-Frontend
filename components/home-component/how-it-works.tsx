import { PlayIcon } from "@/assets/svgs";
import { cn } from "@/libs/utils";
import React from 'react'
import ReactPlayer from 'react-player';
import VideoLayer from '@/assets/images/video-layer.png';
import Image from "next/image";

const HowItWorks = () => {
    const activities: { title: string; color: string }[] = [
        {
            title: 'Proposal',
            color: 'bg-[#444444]'
        },
        {
            title: 'DAO',
            color: 'bg-[#25B81B]'
        },
        {
            title: 'Vote',
            color: 'bg-[#DCBB0C]'
        },
    ]
    return (
<div
    className='w-full p-8 space-y-10 justify-between backdrop-filter backdrop-blur-md border border-[#65656533] rounded-[20px] bg-gradient-to-r from-[#1E1E1E33] to-[#19191933]'
>
  <div className='flex w-full space-x-16'>
    <div className='w-[12%] space-y-6 text-sm'>
      {activities.map((each) => (
        <div role="button" className="border hover:border-primary hover:text-primary text-[#888888] font-light trans border-[#656565B2] flex items-center space-x-3 bg-gradient-to-r from-[#444444] via-[#292929B2] to-[#44444433] p-2 rounded-[25px]" key={each.title}>
            <div className={cn(each.color, 'w-[23px] h-[23px] rounded-full')}></div>
            <p className="">{each.title}</p>
        </div>
      ))}
    </div>
    <div className='w-[100%] border p-4 rounded-[20px] border-[#656565B2]'>
        <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' width="100%"
              controls
              playIcon={<div className="border border-primary flex justify-center items-center rounded-full w-[50px] h-[50px] bg-[#1E1E1E80]"><PlayIcon /></div>}
              light={'https://res.cloudinary.com/djn4tphfy/image/upload/v1714469006/video-layer_zlcfmd.png'}
              style={{ borderRadius: '4px' }}
              playing
               />
    </div>
  </div>
  <div className='flex justify-between space-x-16 items-start'>
<h2 className='text-white text-[36px] leading-[1.2]'>The Future of Decentralized Governance</h2>
<p className='text-[#888888] font-light text-sm'>Engage in our governance process by submitting proposals, voting on decisions, and contributing to community discussions.</p>
  </div>
</div>
    )
};

export default HowItWorks;