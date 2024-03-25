'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/libs/utils';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed right-4 top-4 z-[999] border-none  px-2 py-1 bg-[#1E1E1E] flex space-x-4 rounded-md items-center">
      <Sun className={cn('h-[1.5rem] text-white w-[1.5rem] rotate-0 scale-100 transition-all p-1', theme === 'light' && 'bg-[#444444] rounded-md text-[#9050E9]')} onClick={() => setTheme("light")} role='button' />
      <Moon className={cn('h-[1.5rem] text-white w-[1.5rem] rotate-0 scale-100 transition-all p-1', theme === 'dark' && 'bg-[#444444] rounded-md text-[#9050E9]')} onClick={() => setTheme("dark")} role='button' />
    </div>
  );
}
