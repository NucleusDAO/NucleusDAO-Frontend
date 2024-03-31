import { Button } from "@/components/ui/button";

const EachDaoFunds = () => {
    return (
        <div>
            <div className="text-center w-[30%] space-y-4 mx-auto mt-[10%]">
                <p className="text-sm font-light text-defaultText">Currently, there are no funds in the treasury. You can initiate a proposal to make deposit.</p>
                <Button>Deposit Token</Button>
            </div>
        </div>
    )
};

export default EachDaoFunds;