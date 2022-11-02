import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { FC } from "react";
import { CalendarIcon, UserIcon } from "../../Icons";

export const Nav: FC = () => {
  return (
    <Flex
      bg="black"
      w="100%"
      justify="end"
      align="center"
      px={10}
      h={12}
      gap={8}
    >
      <Flex align="center" gap={2} cursor="pointer">
        <UserIcon />
        <Text>Membership</Text>
      </Flex>
      <Link href="/events" passHref>
        <Flex align="center" gap={2} cursor="pointer">
          <CalendarIcon />
          <Text>Events</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
