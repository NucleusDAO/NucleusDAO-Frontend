import { DaoIcon } from "@/assets/svgs";
import { ReactNode } from "react";

const dashboardFeedsData: { title: string; value: number; icon: ReactNode; }[] = [
    {
        title: 'DAOs Joined',
        value: 0,
        icon: <DaoIcon size='34' />
    },
    {
        title: 'Total Votes',
        value: 0,
        icon: <DaoIcon size='34' />
    },
    {
        title: 'Total Proposals',
        value: 0,
        icon: <DaoIcon size='34' />
    },
];

export { dashboardFeedsData };