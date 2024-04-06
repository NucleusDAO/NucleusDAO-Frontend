'use client';
import { DAO_INFO_URL, DEFINE_MEMBERSHIP_URL, GOVERNANCE_SETTINGS_URL, REVIEW_DAO_URL, SELECT_DAO_STYLE_URL } from '@/config/path';
import { cn } from '@/libs/utils';
import { Check } from 'lucide-react';
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
      url: DEFINE_MEMBERSHIP_URL,
    },
    {
      title: 'Governance Settings',
      url: GOVERNANCE_SETTINGS_URL,
    },
  ];
  const currentStepIndex = steps.findIndex(step => pathname.startsWith(step.url));
  
  return (
    <div className="dark:bg-[#191919] bg-white p-4 rounded-lg md:w-[20%] space-x-8 md:space-x-0 flex md:block items-center md:items-start w-full overflow-auto">
      {steps.map((step, index) => (
        <Link href={step.url} key={step.title}>
          <div className={cn('flex space-x-3 py-4 items-center text-sm')}>
            <div className='w-fit relative'>
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center w-8 h-8 dark:text-[#292929] text-[#CCCCCC] border dark:border-[#292929] border-[#CCCCCC] trans',
                    pathname.startsWith(step.url) && 'border dark:border-primary border-primary text-primary',
                    (currentStepIndex > index || pathname === REVIEW_DAO_URL) && 'bg-primary'
                  )}
                >
                  {(currentStepIndex > index || pathname === REVIEW_DAO_URL) ? <Check color="#FFF" size={16} /> : index + 1}
                </div>
                {index !== steps.length - 1 && (
                <div className={cn('h-8 w-[1px] md:block hidden bg-[#CCCCCC] dark:bg-[#444444] absolute left-4', (currentStepIndex > index || pathname === REVIEW_DAO_URL) && 'bg-primary')} />
                )}
            </div>
            <p className={cn('trans text-sm md:text-base', pathname.startsWith(step.url) ? 'dark:text-white text-[#292929]' : 'dark:text-[#444444] text-[#CCCCCC]')}>{step.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Steps;
