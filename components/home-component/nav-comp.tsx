import { BrandLogo } from '@/assets/svgs';
import { HOME_URL } from '@/config/path';
import AELogo from '@/assets/icons/ae-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import { Button } from '../ui/button';
import AEAnimation from '@/assets/animations/ae-animation';

const NavComp = () => {
  const nav: { title: string; href: string }[] = [
    {
      title: 'About',
      href: '#',
    },
    {
      title: 'How it Works',
      href: '#',
    },
    {
      title: 'Features',
      href: '#',
    },
    {
      title: 'Contact Us',
      href: '#',
    },
  ];
  return (
    <nav className="px-24 items-center flex py-6 justify-between">
        <Link href={HOME_URL} className="flex">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="Nucleus Dao Logo" width={40} />
            <BrandLogo className="text-white w-[130px]" />
          </div>
        </Link>
        <div className="border relative trans border-[#5E5F62B9] bg-[#1E1E1E] hover:border-t-primary hover:border-t px-2 py-4 rounded-full text-white text-sm font-light space-x-14 items-center">
          {nav.map((item) => (
            <Link href={item.href} key={item.title} className='trans border border-[#1E1E1E] hover:border-[#656565B2] rounded-full px-5 py-2 trans hover:text-primary hover:bg-gradient-to-r from-[#656565B2] via-[#65656533] to-transparent font-normal'>
              {item.title}
            </Link>
          ))}
      </div>
      <Button>Connect Wallet</Button>

{/* <AEAnimation className='top-24' /> */}
<div
      className={
        'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute h-[52px] w-[52px] top-28 right-[400px]'
        
      }
    >
      <div className="bg-gradient-to-r h-full w-full from-primary via-primary flex items-center justify-center to-primary shadow-[inset_0px_0px_6px_6px_rgba(0,0,0,0.3)] animate-fade-in-out">
        <Image width={32} height={32} src={AELogo} alt="aelogo" />
      </div>
    </div>
    </nav>
  );
};

export default NavComp;