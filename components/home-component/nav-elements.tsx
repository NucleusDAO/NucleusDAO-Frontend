'use client';
import { navLinks } from '@/config/home-config';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { useState } from 'react';

interface INavElement {
  setOpenDrawer: (arg: boolean) => void;
}

export default function NavElement({ setOpenDrawer }: INavElement) {
  const [hash, setHash] = useState(
    (typeof window !== 'undefined' && window.location.hash) || ''
  );
  return (
    <div className="lg:border grid space-y-4 lg:space-y-0 lg:backdrop-filter lg:backdrop-blur-md lg:bg-[#1E1E1E] pb-0 lg:pb-1 lg:pt-1 lg:flex trans lg:border-[#5E5F62B9]  hover:lg:border-t-primary hover:lg:border-t px-6 lg:px-2 py-0 lg:rounded-full text-white text-sm font-light lg:space-x-10 items-center ">
      {navLinks.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className={cn(
            'trans lg:border lg:border-[#1E1E1E] lg:backdrop-filter lg:backdrop-blur-md hover:border-[#656565B2] rounded-full px-2 lg:px-5 trans hover:text-primary hover:bg-gradient-to-r from-[#656565B2] via-[#65656533] to-transparent font-normal py-2',
            hash === item.href &&
              'text-primary bg-gradient-to-r border-[#656565B2]'
          )}
          onClick={() => {
            setOpenDrawer(false);
            setHash(item.href);
          }}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
