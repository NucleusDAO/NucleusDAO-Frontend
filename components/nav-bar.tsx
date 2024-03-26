import { Search } from 'lucide-react';
import SearchInput from './ui/seach-input';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex bg-foreground py-4 w-full px-8 justify-between items-center">
      <div className="relative w-[50%]">
        <Search
          className="absolute z-[999] top-3.5 left-3"
          strokeWidth={1}
          size={20}
        />
        <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
          queryKey="search"
        />
      </div>
      <div className='w-[18%]'>
        <Button>Connect Wallet</Button>
      </div>
    </nav>
  );
};

export default Navbar;
