import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { data } from "./data";

const EachDaoMembers = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-medium text-xl">Transaction details</h1>
        <Button>Add Member</Button>
      </div>
      
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EachDaoMembers;
