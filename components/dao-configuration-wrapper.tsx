import { Info } from 'lucide-react';
import { Button } from './ui/button';
import { ReactNode } from 'react';
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

interface IDaoConfigurationWrapper {
  children: ReactNode;
}

const DaoConfigurationWrapper = ({ children }: IDaoConfigurationWrapper) => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-dark dark:text-white text-xl font-medium">
          Profile
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Settings</Button>
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
      <div className="flex space-x-1 items-center text-xs text-[#888888]">
        <Info size={14} />
        <p>
          To make changes to the settings, create a proposal and put it to vote
          in your DAO.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DaoConfigurationWrapper;
