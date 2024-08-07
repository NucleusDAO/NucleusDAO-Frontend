'use client';
import { BrandLogo } from '@/assets/svgs';
import { HOME_URL } from '@/config/path';
import AELogo from '@/assets/icons/ae-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import { Button } from '../ui/button';
import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import Menu from '@/assets/icons/hamburger.png';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import NavElement from './nav-elements';
import { toast } from 'sonner';

const NavComp = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1068px)');

  return (
    <nav className="px-4 lg:px-16 lg:items-center block lg:flex lg:py-4 justify-between fixed inset-0 items-start z-[40] lg:top-0 backdrop-filter backdrop-blur-md h-fit w-full max-w-[1800px] mx-auto">
      <div className="flex justify-between items-center w-full max-w-[1800px] mx-auto">
        <Link href={HOME_URL} className="flex cursor-pointer z-[1000]">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="NucleusDao Logo" width={40} />
            <BrandLogo className="text-white w-[100px] lg:w-[130px]" />
          </div>
        </Link>

        <div className="fixed inset-0 lg:flex items-start z-[999] top-6 justify-center hidden">
          <NavElement setOpenDrawer={setOpenDrawer} />
        </div>

        <Image
          src={Menu}
          alt="hamburger"
          width={30}
          onClick={() => setOpenDrawer(true)}
          className="flex lg:hidden"
        />
        {/* <button className="before:ease z-[999] relative h-12 w-40 overflow-hidden shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-white bg-primary before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
          <span className="relative z-10">Slide hover</span>
        </button> */}
        <Link href={'/#join'} className="lg:flex hidden z-[999]">
          <Button className="lg:w-fit w-full px-8">Join Now</Button>
        </Link>
      </div>

      {/* <div
        className={
          'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute lg:h-[52px] h-[40px] w-[40px] xl:w-[52px] top-20 lg:top-28 right-[40px] lg:right-[400px]'
        }
      >
        <div className="bg-gradient-to-r h-full w-full from-primary via-primary flex items-center justify-center to-primary shadow-[inset_0px_0px_6px_6px_rgba(0,0,0,0.3)] animate-fade-in-out">
          <Image
            width={isDesktop ? 32 : 22}
            height={isDesktop ? 32 : 22}
            src={AELogo}
            alt="aelogo"
          />
        </div>
      </div> */}

      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="-mt-6">
              <Link href={HOME_URL} className="flex">
                <div className="flex space-x-2 items-center">
                  <Image
                    id="logo"
                    src={LogoIcon}
                    alt="NucleusDao Logo"
                    width={20}
                  />
                  <BrandLogo className="text-white w-[80px]" />
                </div>
              </Link>
            </SheetTitle>
            <SheetDescription className="text-left -mt-10">
              <NavElement setOpenDrawer={setOpenDrawer} />
              <Link href={'/#join'} className="px-6">
                <Button
                  className="mt-4 w-[80%]"
                  size="sm"
                  onClick={() => toast.info('Coming soon')}
                >
                  Join Now
                </Button>
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavComp;
