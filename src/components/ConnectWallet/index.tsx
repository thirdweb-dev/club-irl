import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useAddress,
  useLogin,
  ConnectWallet as ThirdwebConnectWallet,
} from "@thirdweb-dev/react";
import { useLogin as useLoginSolana } from "@thirdweb-dev/react/solana";
import { FC, useEffect, useState } from "react";

const ConnectWallet: FC = () => {
  const { publicKey } = useWallet();
  const address = useAddress();
  const solanaLogin = useLoginSolana();
  const [isEth, setIsEth] = useState(false);
  const [isSolana, setIsSolana] = useState(false);

  useEffect(() => {
    if (address) {
      setIsEth(true);
    }
  }, [address]);

  return (
    <>
      {publicKey && (
        <Button onClick={() => solanaLogin()}>Sign in with solana</Button>
      )}

      {isSolana && !publicKey && <WalletMultiButton />}

      {isEth && <ThirdwebConnectWallet />}

      {!isEth && !isSolana && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                _hover={{
                  bg: "black",
                  opacity: 0.8,
                }}
                _focus={{
                  bg: "black",
                  opacity: 0.9,
                }}
                bg="black"
                isActive={isOpen}
                as={Button}
              >
                {isOpen ? "Close" : "Connect Wallet"}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setIsSolana(true);
                  }}
                >
                  Solana
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsEth(true);
                  }}
                >
                  Ethereum
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </>
  );
};

export default ConnectWallet;
