import { ThirdwebAuth } from "@thirdweb-dev/auth/next/solana";

export const { ThirdwebAuthHandler, getUser: getUserSolana } = ThirdwebAuth({
  privateKey: process.env.THIRDWEB_PRIVATE_KEY_SOLANA || "",
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
});
