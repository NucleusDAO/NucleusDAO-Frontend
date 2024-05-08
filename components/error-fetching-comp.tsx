'use client';
import Image from 'next/image';
import EmptyDAO from '@/assets/icons/empty-icon.png';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';

const ErrorFetchingComponent = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        'min-h-[80vh] w-full text-center flex items-center justify-center',
        className
      )}
    >
      <div className="w-[30%] space-y-4 mx-auto">
        <h1>This site can’t be reached</h1>
        <p className="mt-2">
          ...Seems like you're having troubles while connecting to our contract
          address. Kindly try again later...
        </p>

        <Button className="w-full" onClick={() => router.refresh()}>
          Retry again!
        </Button>
      </div>
    </div>
  );
};

export default ErrorFetchingComponent;
