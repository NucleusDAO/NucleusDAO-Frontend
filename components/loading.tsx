
interface ILoading {
    description?: string;
}

const Loading = ({ description }: ILoading) => (
    <div className="w-full flex h-[70vh] items-center">
      <div className="mx-auto">
        <img src="/loading.gif" alt="loading" className="w-[150px] h-[150px]" />
        <p className="text-center -mt-2">{description || 'Loading...'}</p>
      </div>
    </div>
  );
  
  export default Loading;