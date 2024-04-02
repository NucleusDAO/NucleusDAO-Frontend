import { ThemeProvider } from '@/components/themes/theme.provider';
import React, { Suspense } from 'react';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Loading from '@/components/loading';
import Sidebar from '@/components/side-bar/sidebar-links';
import Navbar from '@/components/nav-bar';

interface IRootLayouts {
  children: React.ReactNode;
}

export const RootLayoutsComponent = ({ children }: IRootLayouts) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<Loading />}>
        <div className="max-w-[2000px] mx-auto relative">
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[82%] ml-[18%] h-screen">
              <Navbar />
              <div className="mx-6 p-6 rounded-lg dark:bg-foreground bg-light mt-24 max-w-[1500px]">
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
