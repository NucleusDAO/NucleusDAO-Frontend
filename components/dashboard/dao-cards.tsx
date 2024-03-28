import { LinkIcon, PeopleIcon, ProposalIcon2 } from "@/assets/svgs";
import Link from "next/link";
import { ReactNode } from "react";

export interface IDaoCard {
    organisation: string;
    orgIcon: ReactNode;
    description: string;
    activeProposal: string;
    activeMember: string;
    url: string;
}

const DaoCard = ({ organisation, orgIcon, description, activeProposal, activeMember, url }: IDaoCard) => {
    return (
        <div className="bg-[#191919] p-5 rounded-lg space-y-7">
            <div className="flex space-x-4 items-center">
                <div>{orgIcon}</div>
                <div className="space-y-1">
                    <h3 className="text-white font-medium text-[22px]">{organisation}</h3>
                    <Link href={url}>
                        <div className="space-x-1 flex items-center">
                            <p className="text-sm font-light text-defaultText">{url}</p>
                            <LinkIcon />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="text-defaultText">
                <p className="font-light">{description}</p>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-[#1E1E1E] text-sm">
                <div className="flex items-center space-x-2">
                    <PeopleIcon />
                    <p className="text-white">{activeMember}<span className="text-defaultText ml-2">Members</span></p>
                </div>

                <div className="flex items-center space-x-2"> 
                <ProposalIcon2 />
                <p className="text-white">{activeProposal}<span className="text-defaultText ml-2">Proposals</span></p>
                </div>
            </div>
        </div>
    )
};

export default DaoCard;