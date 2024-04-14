'use client';
import ConnectWalletCallToAction from '@/components/connect-wallet-cta';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { useContext } from 'react';

const Proposals = () => {
  const { user } = useContext<any>(ConnectWalletContext);
  const connected: boolean = user.isConnected;
  const tabs: { title: string; value: string }[] = [
    { title: 'All', value: '0' },
    { title: 'Active', value: '1' },
    { title: 'Pending', value: '2' },
    { title: 'Executed', value: '3' },
    { title: 'Failed', value: '4' },
  ];
  return (
    <div className="space-y-8">
      <div className="justify-between items-center flex">
        <h1
          role="heading"
          className="dark:text-white font-medium text-xl text-dark"
        >
          Proposals
        </h1>
      </div>

      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="w-full justify-start space-x-6 border-b-2 dark:border-b-[#292929] border-[#CCCCCC99]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.title} value={tab.value} className="w-fit">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {connected ? (
          <>
            <TabsContent
              value="0"
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab />
            </TabsContent>
            <TabsContent
              value="1"
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab />
            </TabsContent>
            <TabsContent
              value="2"
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab />
            </TabsContent>
            <TabsContent
              value="3"
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab />
            </TabsContent>
            <TabsContent
              value="4"
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab />
            </TabsContent>
          </>
        ) : (
          <div className='h-[65vh] flex items-center justify-center'>
            <ConnectWalletCallToAction description="Connect your wallet to be able to see proposals" />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Proposals;
