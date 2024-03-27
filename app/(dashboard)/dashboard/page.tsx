'use client'
import AllDaos from '@/components/all-daos';
import Cards from '@/components/dashboard/cards';
import {
  dashboardFeedsData,
  dashboardTableData,
} from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

      <AllDaos dashboardTableData={dashboardTableData} />
    </div>
  );
};

export default Dashboard;
