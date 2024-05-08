'use client';
import { BrandLogo } from '@/assets/svgs';
import { HOME_URL } from '@/config/path';
import AELogo from '@/assets/icons/ae-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import { Button } from '../ui/button';
import { navLinks } from '@/config/home-config';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import Background from '@/assets/images/main-bg.png';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';

const NavComp = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [hash, setHash] = useState(
    (typeof window !== 'undefined' && window.location.hash) || ''
  );

  return (
    <nav className="lg:px-16 items-center block lg:flex lg:py-6 justify-between">
      <div
        className={cn(
          'flex justify-between items-center lg:backdrop-blur-none lg:backdrop-filter backdrop-blur-md w-full lg:w-fit fixed lg:relative z-10 px-6 lg:px-0',
          open && 'backdrop-blur-none'
        )}
      >
        <Link href={HOME_URL} className="flex">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="NucleusDao Logo" width={40} />
            <BrandLogo className="text-white w-[100px] lg:w-[130px]" />
          </div>
        </Link>
        <div
          className="block lg:hidden"
          onClick={() => setOpen((prev: boolean) => !prev)}
          role="button"
        >
          {open ? <X /> : <Menu />}
        </div>
      </div>

      {(open || isDesktop) && (
        <div
          className="h-screen lg:h-fit lg:flex justify-between lg:w-[70%] items-center space-y-5 lg:space-y-0 fixed lg:relative z-10 w-full mt-16 lg:mt-0"
          style={{
            background: 'round',
            backgroundImage: `url(${Background.src})`,
          }}
        >
          <div className="lg:border space-y-5 lg:space-y-0 lg:backdrop-filter lg:backdrop-blur-md pt-12 pb-0 lg:pb-1 lg:pt-1 grid lg:flex lg:fixed trans lg:border-[#5E5F62B9] lg:bg-[#1E1E1E] hover:border-t-primary hover:border-t px-6 lg:px-2 py-2 lg:py-0 lg:rounded-full text-white text-sm font-light lg:space-x-14 items-center">
            {navLinks.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className={cn(
                  'trans lg:border lg:border-[#1E1E1E] lg:backdrop-filter lg:backdrop-blur-md hover:border-[#656565B2] rounded-full px-2 lg:px-5 py-2 trans hover:text-primary hover:bg-gradient-to-r from-[#656565B2] via-[#65656533] to-transparent font-normal',
                  hash === item.href &&
                    'text-primary bg-gradient-to-r border-[#656565B2]'
                )}
                onClick={() => {
                  setHash(item.href);
                  setOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="px-6 lg:px-0 lg:absolute lg:right-0">
            <Link href="/#join">
              <Button
                className="lg:w-fit w-full px-8"
                // onClick={() => router.push(DAO_URL)}
              >
                Join Now
                {/* Launch DAO */}
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div
        className={
          'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute lg:h-[52px] h-[40px] w-[40px] lg:w-[52px] top-16 lg:top-28 right-[40px] lg:right-[400px]'
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
    </nav>
  );
};

export default NavComp;
