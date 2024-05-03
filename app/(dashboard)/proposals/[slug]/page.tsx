'use client';
import EachProposalView from '@/components/proposals/each-proposal-view';
import { AppContext } from '@/context/app-context';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/libs/utils';
import { MoveLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const EachProposal = () => {
  const { getEachProposal } = useContext(AppContext);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const tabs: string[] = ['Result', 'Information'];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentTab: string = searchParams.get('q') || tabs[0];

  const handleSwitch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div>
      <div className="flex items-center justify-between border-b dark:border-[#292929] pb-4">
        <div className="flex items-center space-x-4">
          <div
            className="dark:bg-[#1E1E1E] rounded-lg px-4 py-2 bg-white text-[#444444] dark:text-[#D2D2D2]"
            role="button"
            onClick={() => router.back()}
          >
            <MoveLeft size={isDesktop ? 20 : 16} />
          </div>
          <h2 className="dark:text-white text-dark font-medium text-lg md:text-xl">Overview</h2>
        </div>
        <div className="flex space-x-2 md:space-x-3 dark:bg-[#191919] rounded-lg p-2 items-center text-sm bg-white">
          {tabs.map((tab) => (
            <div
              className={cn(
                'p-2 px-2 md:px-4',
                currentTab === tab && 'text-primary rounded-lg dark:bg-[#1E1E1E] bg-light md:text-base text-sm'
              )}
              key={tab}
              onClick={() => handleSwitch(tab)}
              role="button"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      
      <EachProposalView tabs={tabs} currentProposal />
    </div>
  );
};

export default EachProposal;
