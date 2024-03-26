'use client'
import { DashboardIcon } from '@/assets/svgs';
import Cards from '@/components/dashboard/cards';
import { columns } from '@/components/dashboard/columns';
import DaoCard from '@/components/dashboard/dao-cards';
import { dashboardFeedsData, dashboardTableData } from '@/components/dashboard/data';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/search-input';
import { cn } from '@/libs/utils';
import { List, ListFilter, Plus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Dashboard = () => {
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 role="heading" className="text-white font-medium text-xl">
          Global Feed
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create DAO
        </Button>
      </div>

      <div className="gap-6 grid-cols-3 grid">
        {dashboardFeedsData.map((feed) => (
          <Cards key={feed.title} {...feed} />
        ))}
      </div>

      <div className='space-y-3'>
        <div className="border-b border-b-[#292929] pb-8 pt-4 flex justify-between items-center">
          <div className="relative w-[40%]">
            <SearchInput
              placeholder="Search anything here"
              classNames="pl-10"
              queryKey="search"
            />
          </div>
          <div className="flex space-x-3">
            <div
              className="flex space-x-2 border-[#292929] border px-2 py-1.5 rounded-lg items-center text-sm font-light"
              role="button"
            >
              <ListFilter size={20} />
              <p className="text-white">Filter</p>
            </div>
            <div className={cn('border-[#292929] border px-1.5 py-1.5 rounded-lg trans', (currentView === 'list' || currentView === '') && 'bg-[#1E1E1E]')} role='button' onClick={() => handleView('list')}>
              <List size={20} />
            </div>
            <div className={cn("border-[#292929] border px-1.5 py-1.5 rounded-lg trans", currentView === 'grid' && 'bg-[#1E1E1E]')} role='button' onClick={() => handleView('grid')}>
              <DashboardIcon size='20' />
            </div>
          </div>
        </div>

        <div className="">
          {/* <div className="text-center space-y-4">
            <p className="text-sm font-light">
              Connect your wallet to be able to see your DAOs
            </p>
            <Button>Connect Wallet</Button>
          </div> */}
          <div className='mt-10'>
            {(currentView === 'list' || currentView !== 'grid')  && <DataTable columns={columns} data={dashboardTableData(28)} />}
            {currentView === 'grid' && (<div className='grid grid-cols-2 gap-8'>
                        {dashboardTableData(40).map((data) => (
                          <DaoCard key={data.activeMember} {...data} />
                        ))}
              </div>)}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
