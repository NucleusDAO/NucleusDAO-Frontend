import SearchInput from './ui/search-input';
import { Button } from './ui/button';
import { ModeToggle } from './themes/mode-toggle';

const Navbar = () => {
  return (
    <nav className="flex bg-foreground w-[80%] py-4 px-8 justify-between items-center fixed z-[150] max-w-[1500px]">
      <div className="relative w-[40%]">
        <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
          queryKey="search"
        />
      </div>
      <div className="flex space-x-3 items-center">
        <Button>Connect Wallet</Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
