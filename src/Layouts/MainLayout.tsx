import { Flex } from "@chakra-ui/react";
import type { FC } from "react";
import { Header } from "../components/Header";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      bg="url(/assets/background.svg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      flexDir="column"
      py="240px"
    >
      <Header />
      {children}
    </Flex>
  );
};
export default MainLayout;
