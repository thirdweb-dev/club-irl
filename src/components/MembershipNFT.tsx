import { ComponentWithAs, Flex, FlexProps, Spinner } from "@chakra-ui/react";
import {
  ThirdwebNftMedia,
  useContract, useNFT
} from "@thirdweb-dev/react";

export const MembershipNFT: ComponentWithAs<"div", FlexProps> = ({
  height = "calc(100vh - 80px)",
  width = "calc(100vw - 80px)",
  ...props
}) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const { data: nft, isLoading } = useNFT(contract, 0);

  if (isLoading || !nft) {
    return (
      <Flex
        {...props}
        direction="column"
        align="center"
        justify="center"
        height={height}
        width={width}
        bg="black"
      >
        <Spinner color="white" />
      </Flex>
    );
  }

  return (
    <Flex
      {...props}
      direction="column"
      align="center"
      justify="center"
      height={height}
      width={width}
      overflow="hidden"
    >
      <ThirdwebNftMedia
        metadata={nft.metadata}
        style={{
          width: `max(calc(${height} * (16 / 9)), ${width})`,
        }}
      />
    </Flex>
  );
};
