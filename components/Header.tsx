import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { FC } from "react";
import { CalendarIcon, UserIcon } from "../Icons";

interface IHeaderProps {
  showNav?: boolean;
}

export const Header: FC<IHeaderProps> = ({ showNav }) => {
  return (
    <Box w="100%" pos="absolute" top={0}>
      {showNav && (
        <Flex
          bg="black"
          w="100%"
          justify="end"
          align="center"
          px={10}
          h={12}
          gap={8}
        >
          <Flex align="center" gap={2}>
            <UserIcon />
            <Text>Membership</Text>
          </Flex>

          <Flex align="center" gap={2}>
            <CalendarIcon />
            <Text>Events</Text>
          </Flex>
        </Flex>
      )}
      <Image
        src="/assets/logo.svg"
        alt=""
        width={230}
        height={150}
        style={{
          objectFit: "cover",
          margin: "60px",
        }}
      />
    </Box>
  );
};
