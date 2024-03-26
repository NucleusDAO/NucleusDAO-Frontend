import SearchInput from './ui/search-input';
import { Button } from './ui/button';
import { ModeToggle } from './themes/mode-toggle';
import { Bell2 } from '@/assets/svgs';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const connected: boolean = true;
  return (
    <nav className="flex bg-foreground w-[82%] py-4 px-8 justify-between items-center fixed z-[150] max-w-[1500px]">
      <div className="relative w-[40%]">
        <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
          queryKey="search"
        />
      </div>
      <div className="flex space-x-3 items-center">
        {connected ? (
        <div className='flex space-x-3 items-center'>
          <div className="bg-[#1E1E1E] h-11 w-12 justify-center rounded-lg flex items-center relative text-white" role='button'>
            <div className="w-1.5 h-1.5 top-4 bg-[#DD3857] rounded-full absolute right-4" />
            <Bell2 />
          </div>
          
          <div className="bg-[#1E1E1E] h-11 justify-center rounded-lg flex items-center relative text-[#888888] p-3 text-[12px] space-x-3" role='button'>
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
