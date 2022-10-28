import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Form } from "../components/Register/Form";
import MainLayout from "../Layouts/MainLayout";

const Register: NextPage = () => {
  return (
    <MainLayout>
      <Flex w="full" align="center" justify="center" h="100vh">
        <Form />
      </Flex>
    </MainLayout>
  );
};

export default Register;
