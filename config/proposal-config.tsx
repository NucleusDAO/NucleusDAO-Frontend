import {
  EquivalentValueFormField,
  ProposalDurationFormField,
  QuorumFormField,
  TextFormField,
  UpdateSocialsFormField,
  UploadFileFormField,
} from '@/components/proposals/proposal-form-element';
import { ReactNode, FC } from 'react';

export const ProposalTransfer = ({ form }: { form: any }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <TextFormField
          form={form}
          name="targetWallet"
          label="Target Wallet"
          placeholder="Wallet address"
        />

        <EquivalentValueFormField form={form} />
      </div>
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeVotingTime = ({ form }: { form: any }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <TextFormField
          form={form}
          name="minimum"
          type="number"
          label="Minimum"
          placeholder="From how many days"
        />
        <TextFormField
          form={form}
          name="maximum"
          type="number"
          label="Maximum"
          placeholder="To how many days"
        />
      </div>
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToUpdateMember = ({ form }: { form: any }) => {
  return (
    <>
      <TextFormField
        form={form}
        name="targetWallet"
        label="Target Wallet"
        placeholder="Wallet address"
      />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeQuorum = ({ form }: { form: any }) => {
  return (
    <>
      <QuorumFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeDaosName = ({ form }: { form: any }) => {
  return (
    <>
      <TextFormField
        form={form}
        name="newName"
        label="New DAO Name"
        placeholder="Enter DAO New Name"
      />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeDaosLogo = ({ form }: { form: any }) => {
  return (
    <>
      <UploadFileFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToUpdateDaosSocials = ({ form }: { form: any }) => {
  return (
    <>
      <UpdateSocialsFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToUpdateOthers = ({ form }: { form: any }) => {
  return (
    <>
    <ProposalDurationFormField form={form} />
    </>
  );
};

// Define the type for the component function
type ComponentType = FC<{ form: any }>;

// Define the type for the EachProposalType object
interface EachProposalType {
  [key: string]: ComponentType;
}

export const EachProposalType: EachProposalType = {
  0: ProposalTransfer,
  1: ProposeToUpdateMember,
  2: ProposeToUpdateMember,
  3: ProposeToChangeVotingTime,
  4: ProposeToChangeQuorum,
  5: ProposeToChangeDaosName,
  6: ProposeToChangeDaosLogo,
  7: ProposeToUpdateDaosSocials,
  8: ProposeToUpdateOthers,
};
