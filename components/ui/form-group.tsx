import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormGroup: React.FC<Props> = ({ children }) => (
  <div className="relative flex items-center w-full">{children}</div>
);

export default FormGroup;
