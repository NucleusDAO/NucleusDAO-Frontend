'use client';
import { cn } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const daoSettingsSidebarLinks: { title: string }[] = [
  {
    title: 'Profile',
  },
  {
    title: 'Links',
  },
  {
    title: 'Exit DAO',
  },
];

interface ISidebarLinksComp {
    activeSidebar: string
}

const SidebarLinksComp = ({ activeSidebar }: ISidebarLinksComp) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleOnClick = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div className="md:space-y-4 text-[#888888] text-sm flex md:block">
      {daoSettingsSidebarLinks.map((link) => (
        <div
          key={link.title}
          className={cn(
            'py-2 rounded-lg px-4',
            link.title === 'Exit DAO' && 'text-[#DD3857]',
            activeSidebar === link.title && 'dark:bg-[#1E1E1E] dark:text-white bg-light text-dark'
          )}
          onClick={() => {link.title === 'Exit DAO' ? null : handleOnClick(link.title)}}
          role='button'
        >
          {link.title}
        </div>
      ))}
    </div>
  );
};

export default SidebarLinksComp;
