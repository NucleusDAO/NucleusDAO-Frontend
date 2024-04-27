import { IProposal } from "@/context/app-context";
import { getStatus } from "@/libs/utils";
import { toast } from "sonner";

export const getDaoInfo = async ({ secondParts, getProposals, getEachDAO, setCurrentDAO, setEachDAOProposal, router, setIsLoading }) => {
    try {
        const daoId = 'Hexdee DAO' || secondParts;
        if (daoId) {
          const dao = await getEachDAO(daoId);
          setCurrentDAO(dao);
          await getProposals(dao.contractAddress).then((proposals: IProposal[]) => {
            console.log(proposals, '-> proposal')
            setEachDAOProposal(
              proposals.map((proposal: IProposal) => {
                return {
                  type: proposal.proposalType,
                  status: getStatus(proposal),
                  description: proposal.description,
                  wallet:
                    proposal.target.slice(0, 6) +
                    '...' +
                    proposal.target.slice(-4),
                  duration: new Date().toLocaleDateString('en-Gb', {
                    day: 'numeric',
                  }),
                  totalVote: `${proposal.votesFor} + ${proposal.votesAgainst}`,
                  organisation: dao.name,
                  id: proposal.id.toString(),
                };
              })
            );
          });
        } else {
          router.back();
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
        console.error('Error fetching DAO:', error);
      }
}