import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Form } from "../components/Register/Form";
import MainLayout from "../Layouts/MainLayout";
import { IFormData } from "../../types/IFormData";
import { useEffect, useState } from "react";
import { useUser } from "@thirdweb-dev/react";

const Register: NextPage = () => {
  const { user } = useUser();
  const defaultValues = {
    name: "",
    email: "",
    address: user?.address,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IFormData>({
    defaultValues,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user?.address && getValues("address").length === 0) {
      setValue("address", user.address);
    }
  }, [getValues, setValue, user?.address]);

  return (
    <MainLayout>
      <Flex
        w="full"
        align="center"
        justify="center"
        h={{ base: "auto", md: "130vh" }}
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
              Your request has been succesfully submitted. We&apos;ll get back
              to you on your provided method of communication
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
