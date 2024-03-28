import { DAO_URL } from '@/config/path';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import Steps from './create-new/component/steps';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="space-y-8">
      <div className="flex space-x-4 items-start border-b border-b-[#292929] pb-6">
        <Link href={DAO_URL}>
          <div
            className="bg-[#1E1E1E] rounded-lg flex items-center justify-center p-2"
            role="button"
          >
            <MoveLeft />
          </div>
        </Link>
        <div className="space-y-3">
          <h1 className="text-white font-medium text-2xl">Create a DAO</h1>
          <p className="text-defaultText text-sm">
            Begin with a simple approach and embrace a learning mindset along
            the way. Remember that your DAO can continually evolve and improve
            in the future.
          </p>
        </div>
      </div>
      <div className="flex space-x-6 items-start">
        <Steps />
        <div className="rounded-lg p-4 bg-[#191919] w-[80%] h-[65vh] overflow-auto scrollBar">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
