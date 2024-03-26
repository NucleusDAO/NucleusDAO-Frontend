'use client';

import AllDaos from '@/components/all-daos';
import { dashboardTableData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Daos = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 role="heading" className="text-white font-medium text-xl">
          Explore DAOs
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create DAO
        </Button>
      </div>
      <AllDaos dashboardTableData={dashboardTableData} />
    </div>
  );
};

export default Daos;
