'use client';
import { BrandLogo } from '@/assets/svgs';
import { HOME_URL } from '@/config/path';
import AELogo from '@/assets/icons/ae-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
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
import { Button } from '../ui/button';

const NavComp = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1068px)');

  return (
    <nav className="px-4 lg:px-16 lg:items-center block lg:flex lg:py-4 justify-between fixed inset-0 items-start z-[40] lg:top-0 backdrop-filter backdrop-blur-md h-fit">
      <div className="flex justify-between items-center w-full ">
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
        <Link href="#" className="lg:flex hidden z-[999]" target="_blank">
          <Button className="lg:w-fit w-full px-8">Join Now</Button>
        </Link>
      </div>

      <div
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
      </div>

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
              <Link href="#" className="px-6">
                <Button className="mt-4 w-[80%]" size="sm">
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
