'use client';
import { DashboardIcon } from '@/assets/svgs';
import SearchInput from '@/components/ui/search-input';
import { cn } from '@/libs/utils';
import { List, ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import ProposalCard from './card';
import DataTable from '../data-table';
import { columns } from './columns';

const EachFilterTab = ({ proposalData }: { proposalData: any[] }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentView = searchParams.get('v') || '';

  const handleView = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('v', term);
    } else {
      params.delete('v');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className='space-y-6'>
      <div className='border-b dark:border-b-[#292929] pb-6 pt-4 mt-4 md:flex space-y-4 md:space-y-0 justify-between items-center border-b-[#CCCCCC99]'>
        <div className='relative md:w-[40%] w-full'>
          <SearchInput
            placeholder='Search anything here'
            classNames='pl-10'
            queryKey='search'
          />
        </div>
        <div className='flex space-x-3 justify-between'>
          <div
            className='flex space-x-2 dark:text-white text-dark border dark:border-[#292929] border-[#CCCCCC] px-2 py-1.5 rounded-lg items-center text-sm font-light'
            role='button'
          >
            <ListFilter
              size={20}
              className='dark:text-[#B4B4B4] text-[#444444]'
            />
            <p className='dark:text-white text-dark'>Filter</p>
          </div>
          <div className='flex space-x-4 items-center'>
            <div
              className={cn(
                'dark:text-[#B4B4B4] text-[#444444] border dark:border-[#292929] border-[#CCCCCC] px-1.5 py-1.5 rounded-lg trans',
                currentView === 'list' && 'dark:bg-[#1E1E1E] bg-white'
              )}
              role='button'
              onClick={() => handleView('list')}
            >
              <List size={20} />
            </div>
            <div
              className={cn(
                'dark:text-[#B4B4B4] text-[#444444] border dark:border-[#292929] border-[#CCCCCC] px-1.5 py-1.5 rounded-lg trans',
                (currentView === 'grid' || currentView === '') &&
                  'dark:bg-[#1E1E1E] bg-white'
              )}
              role='button'
              onClick={() => handleView('grid')}
            >
              <DashboardIcon size='20' />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-10'>
        {currentView === 'list' && (
          <DataTable columns={columns} data={proposalData} />
        )}

        {(currentView === 'grid' || currentView !== 'list') && (
          <div className='grid md:grid-cols-2 gap-6'>
            {proposalData.map((proposal) => (
              <ProposalCard key={proposal.status} {...proposal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EachFilterTab;
