'use client';
import Image from 'next/image';
import Logo from '@/assets/icons/nucleusdao-logo.png';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/path';
import { bottomSidebarNav, topSidebarNav } from './nav-data';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <div className="w-[20%] px-10 py-8 bg-foreground space-y-20 h-screen">
      <Link href={DASHBOARD_URL}>
        <Image src={Logo} alt="Nucleus Dao Logo" width={150} />
      </Link>

    <div className='space-y-36 hidden lg:block'>
        <div className='space-y-6 font-light text-sm'>
          {topSidebarNav.map((nav) => (
            <Link href={nav.href} className={cn('flex space-x-3 py-2 items-center px-4', pathname.startsWith(nav.href) && 'bg-[#1E1E1E] text-white rounded-lg py-4')} key={nav.title}>
              {nav.icon}
              <p>{nav.title}</p>
            </Link>
          ))}
        </div>

        <div className='border-t pt-10 border-t-[#FFFFFF33]'>
              <div className='space-y-6 font-light text-sm'>
                {bottomSidebarNav.map((nav) => (
                  <Link href={nav.href} className={cn('flex space-x-3 py-2 items-center px-4', pathname.startsWith(nav.href) && 'bg-[#1E1E1E] text-white rounded-lg py-4')} key={nav.title}>
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
