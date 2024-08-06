'use client';

import Background from '@/assets/images/main-bg.png';
import { Separator } from '@/components/ui/separator';
import NotFoundComponent from '@/components/not-found-comp';
import NavComp from '@/components/home-component/nav-comp';
import { cn } from '@/libs/utils';
import { useState } from 'react';

export default function NotFound() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <main
      className={cn('bg-contain bg-no-repeat w-full h-screen flex flex-col')}
      style={{
        background: 'round',
        backgroundImage: `url(${Background.src})`,
      }}
    >
      <NavComp open={open} setOpen={setOpen} />
      <NotFoundComponent />

      <div className="mt-auto px-6 lg:px-24 pb-4">
        <Separator className="bg-[#444444] mb-4  mt-4 lg:mt-1" />
        <div className="flex items-center justify-between text-[12px]">
          <p>{`All Right Reserved. ${new Date().getFullYear()}`}</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </main>
  );
}
