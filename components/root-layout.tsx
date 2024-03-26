import { ThemeProvider } from '@/components/themes/theme.provider';
import React, { Suspense } from 'react';
import { ModeToggle } from '@/components/themes/mode-toggle';
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
              <ModeToggle />
              <div className="flex w-full">
                <Sidebar />
                <div className="w-[80%]">
                  <Navbar />
                  <div className="m-4 p-4 rounded-lg bg-foreground">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
          <Sonner richColors />
        </ThemeProvider>
    )
};

export default RootLayoutsComponent;