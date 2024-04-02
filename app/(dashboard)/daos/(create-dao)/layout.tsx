'use client';
import { DAO_URL } from '@/config/path';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import Steps from './create-new/component/steps';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="space-y-8 min-h-[83vh]">
      <div className="flex space-x-4 items-start border-b border-b-[#292929] pb-6">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <div
              className="dark:bg-[#1E1E1E] bg-white text-[#444444] dark:text-[#D2D2D2] rounded-lg flex items-center justify-center p-2"
              role="button"
            >
              <MoveLeft />
            </div>
          </DialogTrigger>
          <DialogContent className="dark:bg-[#191919] bg-light">
            <DialogHeader>
              <DialogTitle className="font-medium py-3">
                Exit DAO Creation
              </DialogTitle>
              <DialogDescription>
                If you exit the process, all the information you've entered will
                be lost. Are you sure you want to proceed with exiting?
              </DialogDescription>
            </DialogHeader>
          <div className='grid grid-cols-2 gap-4'>
            <Button variant="outline" onClick={() => setOpen(false)}>No, stay</Button>
             <Button>
            <Link href={DAO_URL} className='w-full'>
              Yes, exit
            </Link>
            </Button>
          </div>
          </DialogContent>
        </Dialog>
        <div className="space-y-3">
          <h1 className="dark:text-white text-dark font-medium text-2xl">Create a DAO</h1>
          <p className="text-defaultText text-sm">
            Begin with a simple approach and embrace a learning mindset along
            the way. Remember that your DAO can continually evolve and improve
            in the future.
          </p>
        </div>
      </div>
      <div className="flex space-x-6 items-start">
        <Steps />
        <div className="rounded-lg p-4 dark:bg-[#191919] bg-white w-[80%] max-h-[65vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
