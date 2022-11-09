import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider as ThirdwebProviderSol } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import theme from "../config/theme";
import "../styles/globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");

// This is the chainId your dApp will work on.
export const activeChainId = ChainId.Goerli;
export const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <ThirdwebProvider
          desiredChainId={activeChainId}
          authConfig={{
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
            authUrl: "/api/auth/evm",
            loginRedirect: "/members",
          }}
        >
          <ThirdwebProviderSol
            authConfig={{
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
              authUrl: "/api/auth/solana",
              loginRedirect: "/members",
            }}
            network={network}
          >
            <WalletModalProvider>
              <Component {...pageProps} />
            </WalletModalProvider>
          </ThirdwebProviderSol>
        </ThirdwebProvider>
      </DarkMode>
    </ChakraProvider>
  );
}

export default MyApp;
