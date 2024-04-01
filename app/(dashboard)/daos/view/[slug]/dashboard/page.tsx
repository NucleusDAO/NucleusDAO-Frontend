'use client'
import { ChevronUp } from 'lucide-react';
import { dashboardTab, tabView } from './config';
import { useState } from 'react';
import { cn } from '@/libs/utils';

const EachDaoDashboard = () => {
    const [selectedTab, setSelectTab] = useState<number>(0);
  return (
    <div className="flex space-x-8">
      <div className="w-[25%] space-y-4">
        {dashboardTab.map((tab, index) => (
          <div
            key={tab.title}
            className={cn('p-4 bg-[#191919] rounded-lg flex items-center space-x-4 space-y-4 border trans border-[#191919] hover:border-[#292929]',
            selectedTab === index && 'border-primary hover:border-primary')}
            role='button'
            onClick={() => setSelectTab(index)}
          >
            <div>{tab.icon}</div>
            <div className="space-y-2">
              <div className="space-y-2">
                <p className="text-defaultText font-light text-sm">
                  {tab.title}
                </p>
                <div className='flex space-x-2 items-center'>
                  <p className="text-white font-bold text-2xl">{tab.amount}</p>
                  {!tab.value && (
                    <div className="flex items-center space-x-2 text-[#1CA013] ">
                      <ChevronUp size={16} />
                      <p className="font-medium text-xs">{tab.increase}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="text-xs font-light text-defaultText">
                  {tab.value}
                </p>
                {tab.value && (
                    <div className="flex items-center space-x-2 text-[#1CA013] ">
                    <ChevronUp size={16} />
                    <p className="font-medium text-sm">{tab.increase}</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-[75%] bg-[#191919] p-4 rounded-lg h-[60vh]'>
        {tabView[selectedTab]}
      </div>
    </div>
  );
};

export default EachDaoDashboard;
