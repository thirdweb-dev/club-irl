import { Button, FormControl, Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FC } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormData } from "types/IFormData";
import { FormInput } from "../Register/FormInput";

interface IFormDataProps {
  register: UseFormRegister<IFormData>;
  handleSubmit: UseFormHandleSubmit<IFormData>;
  errors: FieldErrors<IFormData>;
}

export const Form: FC<IFormDataProps> = ({
  register,
  handleSubmit,
  errors,
}) => {
  const toast = useToast();

  const onSubmit = async (data: IFormData) => {
    try {
      await axios.put("/api/user", data);
      toast({
        title: "Success",
        description: "Your profile has been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl
      display="flex"
      flexDir="column"
      bg="black"
      boxShadow="0px 0px 50px #8B38FF"
      rounded="xl"
      w="570px"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      p={16}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading
        fontWeight="500"
        fontSize="32px"
        color="#FF84D4"
        textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
      >
        Edit profile
      </Heading>
      <Text my="6 !important">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum
        quis urna eget convallis. Cras orci enim, mattis eu purus sit amet,
        gravida pharetra lorem. Fusce porta sed mi quis pharetra.
      </Text>
      <FormInput
        placeholder="Your name:"
        register={register}
        id="name"
        error={errors.name}
      />
      <FormInput
        placeholder="Your email:"
        register={register}
        id="email"
        error={errors.email}
      />

      <FormInput
        placeholder="Your wallet address:"
        register={register}
        id="address"
        error={errors.address}
      />

      <Button
        _hover={{
          bg: "url(/assets/button-bg.svg)",
          opacity: "0.8",
        }}
        bg="url(/assets/button-bg.svg)"
        w="146px"
        h="53px"
        mt="4 !important"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        <Text
          bg="linear-gradient(93.33deg, #F213A4 1.94%, #7A66FF 100%)"
          backgroundClip="text"
          textColor="transparent"
        >
          Edit
        </Text>
      </Button>
    </FormControl>
  );
};
