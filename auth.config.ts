import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.THIRDWEB_PRIVATE_KEY as string,
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
});
