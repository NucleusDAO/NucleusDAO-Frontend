'use client';
import SearchInput from './ui/search-input';
import { Button } from './ui/button';
import { ModeToggle } from './themes/mode-toggle';
import { Bell2 } from '@/assets/svgs';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { ChevronDown, Menu, UserRound, X } from 'lucide-react';

import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/path';
import { BrandLogo } from '@/assets/svgs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import ConnectWalletPopOver from './connect-popover';

interface INavbar {
  handleShowNav: (arg: any) => void;
  showNav: boolean;
}

const Navbar = ({ handleShowNav, showNav }: INavbar) => {
  const { handleConnectWallet, user, isConnecting } =
    useContext<any>(AppContext);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const connected: boolean = user.isConnected;
  return (
    <nav className="flex dark:bg-foreground bg-light w-full md:w-[82%] py-4 px-8 md:px-8 justify-between items-center fixed z-[100] max-w-[1500px]">
      <div className="relative w-[40%] hidden md:flex">
        <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
          queryKey="search"
        />
      </div>
      <div className="flex space-x-3 items-center w-full md:w-fit justify-between lg:justify-between">
        <Link href={DASHBOARD_URL} className="flex md:hidden">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="Nucleus Dao Logo" width={30} />
            <BrandLogo className="text-[#282828] dark:text-white w-[100px]" />
          </div>
        </Link>

        {connected ? (
          <div className="flex space-x-3 items-center">
            <ConnectWalletPopOver
              callToAction={
                <div
                className="dark:bg-[#1E1E1E] bg-white h-11 w-12 justify-center rounded-lg flex items-center relative dark:text-white text-[#444444]"
                role="button"
              >
                <div className="w-1.5 h-1.5 top-4 bg-[#DD3857] rounded-full absolute right-4" />
                <Bell2 />
              </div>
              }
            />

            <>
              <ConnectWalletPopOver
              callToAction={
                <div
                    className="dark:bg-primary bg-white h-11 w-12 justify-center rounded-lg flex md:hidden items-center relative dark:text-white text-[#444444]"
                    role="button"
                  >
                    <UserRound />
                  </div>
              }
            />

              <div
                className="dark:bg-[#1E1E1E] bg-white h-11 w-12 justify-center rounded-lg md:hidden flex items-center relative dark:text-white text-[#444444]"
                role="button"
                onClick={() => handleShowNav((prev: boolean) => !prev)}
              >
                {showNav ? <X /> : <Menu />}
              </div>
            </>
            <ConnectWalletPopOver
              callToAction={
                <div
                  className="dark:bg-[#1E1E1E] w-[280px] hidden bg-white h-11 justify-center rounded-lg md:flex items-center relative dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                  role="button"
                >
                  <Image src={RoundedIcon} alt="logo" width={28} />
                  <p className="overflow-hidden text-ellipsis">
                    {user.address}
                  </p>
                  <ChevronDown />
                </div>
              }
            />
          </div>
        ) : (
          <div className='flex space-x-2 items-center'>
            <Button
              onClick={handleConnectWallet}
              loading={isConnecting}
              loadingText="Connecting..."
            >
              Connect Wallet
            </Button>
            <div
                className="dark:bg-[#1E1E1E] bg-white h-11 w-12 justify-center rounded-lg md:hidden flex items-center relative dark:text-white text-[#444444]"
                role="button"
                onClick={() => handleShowNav((prev: boolean) => !prev)}
              >
                {showNav ? <X /> : <Menu />}
              </div>
            </div>
        )}

        {isDesktop && <ModeToggle />}
      </div>
    </nav>
  );
};

export default Navbar;
