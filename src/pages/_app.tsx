import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import theme from "../config/theme";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <ThirdwebProvider
          desiredChainId={activeChainId}
          authConfig={{
            domain: "example.org",
            authUrl: "/api/auth",
            loginRedirect: "/members",
          }}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>
      </DarkMode>
    </ChakraProvider>
  );
}

export default MyApp;
