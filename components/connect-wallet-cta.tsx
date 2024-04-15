import { ConnectWalletContext } from "@/context/connect-wallet-context";
import { Button } from "./ui/button";
import { useContext } from "react";
import { IConnectWalletContext } from "@/libs/types";

interface IConnectWalletCTA {
    description: string;
}

const ConnectWalletCallToAction = ({ description }: IConnectWalletCTA) => {
    const { handleConnectWallet } = useContext<IConnectWalletContext>(ConnectWalletContext);
    return (
        <div className="text-center space-y-4 items-center">
          <p className="text-sm font-light">
            {description}
          </p>
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        </div>
    )
};

export default ConnectWalletCallToAction;