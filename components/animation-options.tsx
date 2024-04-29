import ProposalAnimation from '@/assets/animations/proposal-animation.json';
import SuccessAnimation from '@/assets/animations/success-animation.json';


export const defaultProposalOption = {
  loop: true,
  autoplay: true,
  animationData: ProposalAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const defaultSuccessOption = {
  loop: true,
  autoplay: true,
  animationData: SuccessAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};