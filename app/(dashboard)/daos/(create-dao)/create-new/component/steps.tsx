'use client';
import { DAO_INFO_URL, SELECT_DAO_STYLE_URL } from '@/config/path';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Steps = () => {
  const pathname = usePathname();
  const steps = [
    {
      title: 'Select DAO Style',
      url: SELECT_DAO_STYLE_URL,
    },
    {
      title: 'DAO Information',
      url: DAO_INFO_URL,
    },
    {
      title: 'Define Membership',
      url: '#',
    },
    {
      title: 'Governance Settings',
      url: '#',
    },
  ];
  return (
    <div className="bg-[#191919] p-4 rounded-lg w-[20%]">
      {steps.map((step, index) => (
        <Link href={step.url} key={step.title}>
          <div className={cn('flex space-x-3 font-light py-4 items-center text-sm')}>
            <div
              className={cn(
                'rounded-full flex items-center justify-center w-8 h-8 text-[#292929] border border-[#292929] trans',
                pathname.startsWith(step.url) && 'border border-primary text-primary',
              )}
            >
              {index + 1}
            </div>
            <p className={cn('trans', pathname.startsWith(step.url) ? 'text-white' : 'text-[#292929]')}>{step.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Steps;
