import SearchInput from './ui/search-input';
import { Button } from './ui/button';
import { ModeToggle } from './themes/mode-toggle';
import { Bell2 } from '@/assets/svgs';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { notificationData } from './notifications/data';

const Navbar = () => {
  const connected: boolean = true;
  return (
    <nav className="flex dark:bg-foreground bg-light w-[82%] py-4 px-8 justify-between items-center fixed z-[10] max-w-[1500px]">
      <div className="relative w-[40%]">
        <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
          queryKey="search"
        />
      </div>
      <div className="flex space-x-3 items-center">
        {connected ? (
          <div className="flex space-x-3 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="dark:bg-[#1E1E1E] bg-white h-11 w-12 justify-center rounded-lg flex items-center relative dark:text-white text-[#444444]"
                  role="button"
                >
                  <div className="w-1.5 h-1.5 top-4 bg-[#DD3857] rounded-full absolute right-4" />
                  <Bell2 />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="mt-2 px-6 pt-3 pb-8 w-[450px]"
                style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
              >
                <div className="flex justify-between items-center text-sm border-b pb-3 dark:border-b-[#292929] border-b-[#CCCCCC99] font-light">
                  <p className="font-medium dark:text-[#F5F5F5] text-dark">Notifications</p>
                  <p className="text-primary" role='button'>Mark All as Read</p>
                </div>
                {notificationData.length === 0 ? (<p className='text-sm text-[#888888] pt-8 text-center'>You have no notifications</p>) : (
                  <div className='max-h-[400px] overflow-auto'>
                {notificationData.map((notification) => (
                  <div key={notification.title} className='flex space-x-3 text-sm space-y-5 justify-start mt-3'>
                    <div className='mt-4'>
                      <Image src={RoundedIcon} alt="logo" width={50} height={50} />
                    </div>
                    <div className='space-y-2'>
                      <p className='dark:text-[#F5F5F5] text-dark'>{notification.title}</p>
                      <p className='font-light text-[#888888]'>{notification.description}</p>
                      <p className='text-[12px] text-[#444444]'>{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-1.5 h-1.5 bg-[#DD3857] rounded-full mr-4" />
                    )}
                  </div>
                ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <div
              className="dark:bg-[#1E1E1E] bg-white h-11 justify-center rounded-lg flex items-center relative text-[#888888] p-3 text-[12px] space-x-3"
              role="button"
            >
              <Image src={RoundedIcon} alt="logo" width={28} />
              <p>9xfDAO...ntY897</p>
              <ChevronDown />
            </div>
          </div>
        ) : (
          <Button>Connect Wallet</Button>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
