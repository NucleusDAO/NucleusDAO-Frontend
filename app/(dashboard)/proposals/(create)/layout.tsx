'use client';

import { MoveLeft } from 'lucide-react';
import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Steps from './component/steps';
import { useRouter } from 'next/navigation';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="flex space-x-4 items-start border-b dark:border-b-[#292929] pb-6 border-[#CCCCCC99]">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <div
              className="dark:bg-[#1E1E1E] rounded-lg flex items-center justify-center p-2 bg-white text-[#444444] dark:text-defaultText"
              role="button"
            >
              <MoveLeft />
            </div>
          </DialogTrigger>
          <DialogContent className="dark:bg-[#191919] bg-light">
            <DialogHeader>
              <DialogTitle className="dark:text-white font-medium py-3 text-dark">
                Exit Proposal Creation
              </DialogTitle>
              <DialogDescription>
                If you exit the process, all the information you've entered will
                be lost. Are you sure you want to proceed with exiting?
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                No, stay
              </Button>
              <Button onClick={() => router.back()}>
                  Yes, exit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="space-y-3">
          <h1 className="dark:text-white text-dark font-medium text-2xl">Create a Proposal</h1>
          <p className="text-defaultText text-sm">
            Ensure you provide comprehensive details, data, and any relevant
            supporting materials that will assist voters in making a
            well-informed choice.
          </p>
        </div>
      </div>
      <div className="flex space-x-6 items-start">
        <Steps />
        <div className="rounded-lg p-4 dark:bg-[#191919] bg-white w-[80%] h-[65vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
