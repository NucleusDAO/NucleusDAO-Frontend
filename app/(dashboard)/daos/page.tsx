'use client';

import AllDaos from '@/components/all-daos';
import { dashboardTableData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Daos = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 role="heading" className="text-white font-medium text-xl">
          Explore DAOs
        </h1>
        <Link href={SELECT_DAO_STYLE_URL}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        </Link>
      </div>
      <AllDaos dashboardTableData={dashboardTableData} />
    </div>
  );
};

export default Daos;
