'use client';
import { ThemeProvider } from '@/components/themes/theme.provider';
import React, { Suspense, useState } from 'react';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Loading from '@/components/loading';
import Sidebar from '@/components/side-bar/sidebar-links';
import Navbar from '@/components/nav-bar';

interface IRootLayouts {
  children: React.ReactNode;
}

export const RootLayoutsComponent = ({ children }: IRootLayouts) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<Loading />}>
        <div className="max-w-[2000px] mx-auto relative">
        {showNav && (
            <div
              className="inset-0 w-full bg-[#00000090] opacity-100 h-[100%] ease-in-out duration-300 fixed z-0"
              onClick={() => setShowNav(false)}
            ></div>
          )}

          <div className="flex w-full items-start">
            <Sidebar showNav={showNav} handleShowNav={setShowNav} />
            <div className="w-full md:w-[82%] md:ml-[18%] h-screen overflow-y-auto">
              <Navbar handleShowNav={setShowNav} showNav={showNav} />)
              <div className="md:mx-6 p-6 rounded-lg dark:bg-foreground bg-light mt-24 overflow-auto max-w-[1500px]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Sonner richColors />
    </ThemeProvider>
  );
};

export default RootLayoutsComponent;
