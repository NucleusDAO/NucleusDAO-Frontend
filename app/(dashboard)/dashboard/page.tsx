import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 role="heading" className="text-white font-medium text-xl">Global Feed</h1>
                <Button><Plus className="mr-2 h-4 w-4" /> Create DAO</Button>
            </div>
        </div>
    )
};

export default Dashboard