'use client';
import { DashboardIcon } from '@/assets/svgs';
import DataTable from '@/components/data-table';
import SearchInput from '@/components/ui/search-input';
import { cn } from '@/libs/utils';
import { List, ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { columns } from './dashboard/columns';
import DaoCard from './dashboard/dao-cards';
import ConnectWalletCallToAction from './connect-wallet-cta';
import { ReactNode, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface IAllDaos {
  showDAO: boolean;
  connectWalletDescription?: string;
  dashboardTableData: (arg: number) => {
    organisation: string;
    orgIcon: ReactNode;
    description: string;
    votes: string;
    url: string;
    activeMember: string;
    activeProposal: string;
  }[];
}

const AllDaos: any = ({
  dashboardTableData,
  connectWalletDescription,
  showDAO,
}: IAllDaos) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentView = searchParams.get('v') || '';
  const currentSearch = searchParams.get('search');

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
    <div className="space-y-3">
      <div className="border-b dark:border-b-[#292929] border-b-[#CCCCCC99] pb-6 pt-4 md:flex justify-between items-center space-y-4 md:space-y-0">
        <div className="relative md:w-[40%]">
          <SearchInput
            placeholder="Search by organization name"
            classNames="pl-10"
            queryKey="search"
          />
        </div>
        <div className="flex space-x-3 justify-between md:justify-start">
          <Popover onOpenChange={setOpenPopover} open={openPopover}>
            <PopoverTrigger>
              <div
                className="flex space-x-2 dark:text-white text-dark border dark:border-[#292929] border-[#CCCCCC] px-2 py-1.5 rounded-lg items-center text-sm font-light"
                role="button"
              >
                <ListFilter
                  size={20}
                  className="dark:text-[#B4B4B4] text-[#444444]"
                />
                <p className="dark:text-white text-dark">Filter</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className='dark:text-[#888888] text-dark border dark:border-[#292929] border-[#CCCCCC] w-[150px] py-2 text-sm space-y-3 font-light'>
              <div role='button' className='hover:bg-[#1E1E1E] py-2 px-2 rounded-md' onClick={() => setOpenPopover(false)}>Basic DAO</div>
              <Separator />
              <div role='button' className='hover:bg-[#1E1E1E] py-2 px-2 rounded-md' onClick={() => { toast.info('Coming soon'); setOpenPopover(false) }}>Open DAO</div>
            </PopoverContent>
          </Popover>
          <div className="flex justify-between space-x-4">
            <div
              className={cn(
                'dark:text-[#B4B4B4] text-[#444444] border dark:border-[#292929] border-[#CCCCCC] px-1.5 py-1.5 rounded-lg trans',
                currentView === 'list' && 'dark:bg-[#1E1E1E] bg-white'
              )}
              role="button"
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
              role="button"
              onClick={() => handleView('grid')}
            >
              <DashboardIcon size="20" />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {showDAO ? (
          <div className="w-full">
            {currentView === 'list' && (
              <DataTable columns={columns} data={dashboardTableData(28)} />
            )}
            {(currentView === 'grid' || currentView !== 'list') && (
              <>
                {dashboardTableData(0).length === 0 && showDAO && (
                  <div className="h-[40vh] flex items-center justify-center">
                    <p>
                      {currentSearch
                        ? 'Search could not found'
                        : 'You do not have an active DAO currently'}
                    </p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-8">
                  {dashboardTableData(40).map((data: any) => (
                    <DaoCard key={data.activeMember} {...data} />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className=" flex items-center justify-center min-h-[40vh]">
            <ConnectWalletCallToAction
              description={
                connectWalletDescription ||
                'Connect your wallet to be able to see your DAOs'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDaos;
