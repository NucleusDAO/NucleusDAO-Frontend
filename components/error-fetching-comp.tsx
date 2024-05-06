'use client';
import Image from 'next/image';
import EmptyDAO from '@/assets/icons/empty-icon.png';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const ErrorFetchingComponent = () => {
  const router = useRouter();
  return (
    <div className="min-h-[80vh] w-full text-center flex items-center justify-center">
      <div className="w-[30%] space-y-4 mx-auto">
        <Image src={EmptyDAO} alt="DAO empty" width={100} className="mx-auto" />
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
