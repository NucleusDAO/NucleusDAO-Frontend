'use client';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { settingsSidebarLinks } from './config';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <h1 className="text-white text-xl font-medium">Settings</h1>
      <div className="flex justify-between items-start space-x-4">
        <div className="w-[20%] bg-[#191919] rounded-lg p-4">
          <div className="space-y-6 text-[#888888] text-sm">
            {settingsSidebarLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div
                  className={cn(
                    'py-2 rounded-lg px-3 flex font-light items-center space-x-2 my-4',
                    pathname === link.href && 'bg-[#1E1E1E] text-white'
                  )}
                >
                  <div>{link.icon}</div>
                  <p>{link.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[80%] bg-[#191919] rounded-lg p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
