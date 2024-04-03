'use client'
import AllDaos from '@/components/all-daos';
import Cards from '@/components/dashboard/cards';
import {
  dashboardFeedsData,
  dashboardTableData,
} from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 role="heading" className="dark:text-white text-[#292929] font-medium text-xl">
          Global Feed
        </h1>
        <Link href={SELECT_DAO_STYLE_URL}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        </Link>
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
