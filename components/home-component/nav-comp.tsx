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

const NavComp = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="lg:px-24 items-center block lg:flex lg:py-6 justify-between">
      <div className='flex justify-between items-center lg:backdrop-blur-none backdrop-filter backdrop-blur-md w-full lg:w-fit fixed lg:relative z-10 px-6 lg:px-0'>
          <Link href={HOME_URL} className="flex">
            <div className="flex space-x-2 items-center">
              <Image id="logo" src={LogoIcon} alt="NucleusDao Logo" width={40} />
              <BrandLogo className="text-white w-[100px] lg:w-[130px]" />
            </div>
          </Link>
          <div className='block lg:hidden' onClick={() => setOpen((prev: boolean) => !prev)} role='button'>{open ? <X /> : <Menu />}</div>
      </div>

{(open || isDesktop) && (
      <React.Fragment>
          <div className="lg:border pt-16 pb-0 lg:pb-2 lg:pt-2  grid lg:flex relative trans lg:border-[#5E5F62B9] lg:bg-[#1E1E1E] hover:border-t-primary hover:border-t px-6 lg:px-2 py-2 lg:py-0 lg:rounded-full text-white text-sm font-light lg:space-x-14 items-center">
            {navLinks.map((item) => (
              <Link href={item.href} key={item.title} className='trans lg:border lg:border-[#1E1E1E] hover:border-[#656565B2] rounded-full px-2 lg:px-5 py-2 trans hover:text-primary hover:bg-gradient-to-r from-[#656565B2] via-[#65656533] to-transparent font-normal'>
                {item.title}
              </Link>
            ))}
        </div>
        <div className='px-6 lg:px-0'>
          <Button className='lg:w-fit w-full'>Connect Wallet</Button>
        </div>
      </React.Fragment>
)}
<div
      className={
        'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute h-[52px] w-[52px] top-28 right-[100px] lg:right-[400px]'
        
      }
    >
      <div className="bg-gradient-to-r h-full w-full from-primary via-primary flex items-center justify-center to-primary shadow-[inset_0px_0px_6px_6px_rgba(0,0,0,0.3)] animate-fade-in-out">
        <Image width={32} height={32} src={AELogo} alt="aelogo" />
      </div>
    </div>
    </nav>
  );
};

export default NavComp;