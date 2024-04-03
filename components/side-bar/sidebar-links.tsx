'use client';
import Image from 'next/image';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/path';
import { bottomSidebarNav, topSidebarNav } from './nav-data';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/assets/svgs';

const Sidebar = () => {
    const pathname = usePathname();   

  return (
    <div className="w-[18%] px-10 py-2 dark:bg-foreground bg-light space-y-20 h-full fixed max-w-[400px]">
      <Link href={DASHBOARD_URL}>
        <div className='flex space-x-2 items-center -mb-8'>
          <Image id="logo" src={LogoIcon} alt="Nucleus Dao Logo" width={35}  />
          <BrandLogo className='text-[#282828] dark:text-white w-[120px]' />
        </div>
      </Link>

    <div className='space-y-36 hidden lg:block'>
        <div className='space-y-6 text-sm'>
          {topSidebarNav.map((nav) => (
            <Link href={nav.href} className={cn('flex space-x-3 py-4 items-center px-4', pathname.startsWith(nav.href) && 'dark:bg-[#1E1E1E] bg-white text-dark dark:text-white rounded-lg')} key={nav.title}>
              {nav.icon}
              <p>{nav.title}</p>
            </Link>
          ))}
        </div>

        <div className='border-t pt-10 dark:border-t-[#FFFFFF33] border-t-[#CCCCCC99]'>
              <div className='space-y-6 text-sm'>
                {bottomSidebarNav.map((nav) => (
                  <Link href={nav.href} className={cn('flex space-x-3 py-4 items-center px-4', pathname.startsWith(nav.href) && 'dark:bg-[#1E1E1E] bg-white text-dark dark:text-white rounded-lg')} key={nav.title}>
                    {nav.icon}
                    <p>{nav.title}</p>
                  </Link>
                ))}
              </div>
        </div>
    </div>
    </div>
  );
};

export default Sidebar;
