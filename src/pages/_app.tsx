import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import theme from "../config/theme";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { NextSeo } from "next-seo";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Polygon;

const seoData = {
  title: "clubIRL",
  description:
    "clubIRL is an invite only community which brings together founders, builders, and leaders from top global brands, hot startups, and web3 innovators for IRL experiences.",
  url: "https://clubirl.com",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.url}
        defaultTitle={seoData.title}
        twitter={{
          handle: "@thirdweb",
          cardType: "summary_large_image",
          site: "@thirdweb",
        }}
        openGraph={{
          url: seoData.url,
          title: seoData.title,
          description: seoData.description,
          images: [
            // TODO: Add image
            // {
            //   url: "/og-image.png",
            //   width: 800,
            //   height: 420,
            //   alt: "clubIRL",
            // },
          ],
        }}
      />
      <DarkMode>
        <ThirdwebProvider
          desiredChainId={activeChainId}
          authConfig={{
            authUrl: "/api/auth",
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
            loginRedirect: "/members",
          }}
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL as string,
              },
            },
          }}
        >
          <NextNProgress
            color="#FF84D4"
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
        </ThirdwebProvider>
      </DarkMode>
    </ChakraProvider>
  );
}

export default MyApp;
