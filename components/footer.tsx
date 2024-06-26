import { HOME_URL } from '@/config/path';
import Link from 'next/link';
import { BrandLogo, FacebookIcon, InstagramIcon } from '@/assets/svgs';
import Image from 'next/image';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import { navLinks } from '@/config/home-config';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="">
      <div className="items-center lg:flex justify-between space-y-4 lg:space-y-0">
        <Link href={HOME_URL} className="flex">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="Nucleus Dao Logo" width={40} />
            <BrandLogo className="text-white  w-[100px] lg:w-[130px" />
          </div>
        </Link>
        <div className="relative grid grid-cols-2 lg:flex trans px-2 rounded-full text-white text-sm font-light lg:space-x-14 items-center">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="trans rounded-full lg:px-5 py-2 trans hover:text-primary font-normal"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="space-x-4 flex items-center">
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </div>
      <Separator className="bg-[#444444] mb-4  mt-4 lg:mt-1" />
      <div className="flex items-center justify-between text-[12px]">
        <p>{`All Right Reserved. ${new Date().getFullYear()}`}</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
