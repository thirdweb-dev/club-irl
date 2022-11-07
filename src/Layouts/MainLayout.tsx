import { Flex } from "@chakra-ui/react";
import type { FC } from "react";
import { Header } from "../components/Header";

interface IMainLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const MainLayout: FC<IMainLayoutProps> = ({ showNav, children }) => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      bg="url(/assets/background.svg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      flexDir="column"
      py={{ base: "200px", md: "100px" }}
    >
      <Header showNav={showNav} />
      {children}
    </Flex>
  );
};
export default MainLayout;
