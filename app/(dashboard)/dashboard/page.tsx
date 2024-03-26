import { DashboardIcon } from '@/assets/svgs';
import Cards from '@/components/dashboard/cards';
import { columns } from '@/components/dashboard/columns';
import { dashboardFeedsData, dashboardTableData } from '@/components/dashboard/data';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/search-input';
import { List, ListFilter, Plus } from 'lucide-react';

const Dashboard = () => {
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
              className="flex space-x-2 border-[#292929] border px-2 py-1 rounded-lg items-center text-sm font-light"
              role="button"
            >
              <ListFilter size={18} />
              <p className="text-white">Filter</p>
            </div>
            <div className="border-[#292929] border px-1.5 py-1 rounded-lg">
              <List size={18} />
            </div>
            <div className="border-[#292929] border px-1.5 py-1 rounded-lg">
              <DashboardIcon size='18' />
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
          <DataTable columns={columns} data={dashboardTableData} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
