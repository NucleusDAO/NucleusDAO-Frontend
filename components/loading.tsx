import { Loader } from 'lucide-react';

interface ILoading {
  description?: string;
}

const Loading = ({ description }: ILoading) => (
  <div className="w-full flex h-[70vh] items-center">
    <div className="mx-auto">
      <Loader className="mr-2 h-8 w-8 animate-spin text-center" />
      {/* <p className="text-center -mt-2">{description || 'Loading...'}</p> */}
    </div>
  </div>
);

export default Loading;
