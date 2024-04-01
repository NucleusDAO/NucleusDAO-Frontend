import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { data } from './data';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { CREATE_PROPOSAL_URL } from '@/config/path';

const EachDaoMembers = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-medium text-xl">Transaction details</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Member</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#191919]">
            <DialogHeader>
              <DialogTitle className="text-white font-medium py-3">
                Add Member
              </DialogTitle>
              <DialogDescription className="font-light py-2">
                You have to make a proposal before you can add members to the
                DAO. Do you want to make a proposal now?
              </DialogDescription>
            </DialogHeader>

            <Link href={CREATE_PROPOSAL_URL}>
              <Button className="w-full">Propose</Button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EachDaoMembers;
