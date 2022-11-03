import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Form } from "../components/Register/Form";
import MainLayout from "../Layouts/MainLayout";
import { IFormData } from "../../types/IFormData";
import { useState } from "react";

const Register: NextPage = () => {
  const defaultValues = {
    name: "",
    email: "",
    address: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <MainLayout>
      <Flex
        w="full"
        align="center"
        justify="center"
        h={{ base: "auto", md: "100vh" }}
      >
        {isSubmitted ? (
          <VStack maxW="442px">
            <Heading
              fontWeight="500"
              fontSize="32px"
              color="#FF84D4"
              textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
            >
              Thanks
            </Heading>
            <Text textAlign="center" mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
              egestas est. Fusce condimentum erat eget sollicitudin
              sollicitudin. Sed auctor condimentum enim ut ultrices.
            </Text>
            <Image
              src="/assets/icons/vip.svg"
              alt="check"
              w="300px"
              h="405px"
              objectFit="contain"
            />
          </VStack>
        ) : (
          <Form
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setIsSubmitted={setIsSubmitted}
          />
        )}
      </Flex>
    </MainLayout>
  );
};

export default Register;
