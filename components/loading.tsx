'use client'
import { Loader } from 'lucide-react';
import Lottie from 'react-lottie';
import { defaultProposalOption } from './animation-options';

interface ILoading {
  description?: string;
}

const Loading = ({ description }: ILoading) => (
  <div className="w-full flex h-[70vh] items-center">
    <div className="mx-auto">
      {/* <Loader className="mr-2 h-8 w-8 animate-spin text-center" /> */}
      <Lottie options={defaultProposalOption} height={150} width={150} />
      {/* <p className="text-center -mt-2">{description || 'Loading...'}</p> */}
    </div>
  </div>
);

export default Loading;
