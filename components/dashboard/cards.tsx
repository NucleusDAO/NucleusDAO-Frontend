import { ReactNode } from 'react';

interface ICards {
  title: string;
  value: number;
  icon: ReactNode;
}

const Cards = ({ title, value, icon }: ICards) => {
  return (
    <div className="flex space-x-4 items-center bg-[#191919] p-4 rounded-lg" role="feed">
      {icon}
      <div className="space-y-1">
        <h2 className="text-[#888888] text-sm">{title}</h2>
        <h3 className="text-[#F5F5F5] font-bold text-[24px]">{value}</h3>
      </div>
    </div>
  );
};

export default Cards;