import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface IDaoConfigurationWrapper {
    children: ReactNode;
}

const DaoConfigurationWrapper = ({ children }: IDaoConfigurationWrapper) => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-medium">Profile</h2>
        <Button>Edit Settings</Button>
      </div>
      <div className="flex space-x-1 items-center text-xs text-[#888888] font-light">
        <Info size={14} />
        <p>
          To make changes to the settings, create a proposal and put it to vote
          in your DAO.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DaoConfigurationWrapper;
