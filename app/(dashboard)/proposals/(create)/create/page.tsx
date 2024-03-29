import CreateNewProposalForm from "@/components/forms/create-new-proposal-form";


const CreateProposal = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-xl">New Proposal</h1>
        <p className="text-[#888888] text-sm font-light">
          Present all the necessary information that voters require to make an
          informed decision in this section.
        </p>
      </div>

      <CreateNewProposalForm />
    </div>
  );
};

export default CreateProposal;
