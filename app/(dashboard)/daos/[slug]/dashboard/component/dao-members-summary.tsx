'use client';
import Graph from '@/components/ui/graph';
import { cn } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const DaoMembers = () => {
  const period = ['1W', '1M', '1Y', 'ALL'];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentPeriod = searchParams.get('q') || 'ALL';

  const handleSelect = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="p-4 h-full">
      <div className="md:flex justify-between pb-4 space-y-3 md:space-y-0">
        <h2 className="text-white font-medium text-xl">Productivity</h2>
        <div className="flex space-x-4">
          {period.map((each) => (
            <div
              className={cn(
                'rounded-lg border border-[#444444] px-2 py-1 text-xs',
                currentPeriod === each && 'border-primary text-primary'
              )}
              role="button"
              key={each}
              onClick={() => handleSelect(each)}
            >
              {each}
            </div>
          ))}
        </div>
      </div>
      <div className='flex space-x-1 items-center pb-8 '>
        <div className='bg-primary h-2.5 w-2.5 rounded-full' />
        <p className='text-xs font-light text-defaultText'>Members</p>
      </div>
      <Graph />
    </div>
  );
};
