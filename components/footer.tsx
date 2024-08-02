import { HOME_URL } from '@/config/path';
import Link from 'next/link';
import { BrandLogo, TwitterIcon } from '@/assets/svgs';
import Image from 'next/image';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import { navLinks } from '@/config/home-config';
import { Separator } from './ui/separator';
import TelegramLogo from '@/assets/icons/telegram-icon.png';
import MediumLogo from '@/assets/icons/medium-logo.png';

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
        <div className="relative grid grid-cols-1 lg:flex trans px-2 rounded-full text-white text-sm font-light lg:space-x-14 items-center">
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
        <div className="space-x-3 flex items-center">
          <Link href="https://twitter.com/NucleusDAO" target="_blank">
            <TwitterIcon />
          </Link>
          <Link href="https://t.me/nucleusdao" target="_blank">
            <Image
              src={TelegramLogo}
              alt="Telegram logo"
              width={24}
              role="button"
            />
          </Link>
          <Link href="https://medium.com/@NucleusDAO" target="_blank">
            <Image
              src={MediumLogo}
              alt="Medium logo"
              width={36}
              role="button"
            />
          </Link>
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
