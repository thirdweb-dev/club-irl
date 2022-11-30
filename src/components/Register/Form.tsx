import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Text,
  useToast,
  Input,
  FormLabel,
  Select,
  Textarea,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormData } from "types/IFormData";
import { FormInput } from "./FormInput";

interface IFormDataProps {
  register: UseFormRegister<IFormData>;
  handleSubmit: UseFormHandleSubmit<IFormData>;
  errors: FieldErrors<IFormData>;
  setIsSubmitted: (value: boolean) => void;
}

export const Form: FC<IFormDataProps> = ({
  register,
  handleSubmit,
  errors,
  setIsSubmitted,
}) => {
  const toast = useToast();
  const [isAccepted, setIsAccepted] = useState(false);

  const onSubmit = async (data: IFormData) => {
    try {
      await axios.post("/api/user", data);
      toast({
        title: "Success",
        description: "Your request has been submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitted(true);
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
      mt={{ base: "40px", md: "200px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading
        fontWeight="500"
        fontSize="32px"
        color="#FF84D4"
        textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
      >
        Membership request
      </Heading>
      <Text my="6 !important">
        clubIRL is an invite only community. Please fill out this form to apply.
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
        placeholder="City you are located in:"
        register={register}
        id="location_city"
        error={errors.location_city}
      />
      <FormInput
        placeholder="Your wallet address:"
        register={register}
        id="address"
        error={errors.address}
      />
      <FormInput
        placeholder="Your company:"
        register={register}
        id="company"
        error={errors.company}
      />
      <FormInput
        placeholder="Your role:"
        register={register}
        id="role"
        error={errors.role}
      />

      <FormControl variant="floating" isRequired>
        <Input
          _focus={{
            boxShadow: "0px 0px 10px 2px #9A66FF",
            borderColor: "#9A66FF",
            outline: "none",
          }}
          w="full"
          outline="none"
          border="1px solid"
          borderColor="#4B3678"
          borderRadius="9px"
          py={6}
          placeholder=""
          my="2 !important"
          {...register("bio", {
            required: {
              value: true,
              message: `bio is required`,
            },
          })}
        />
        <FormLabel>{"Your bio:"}</FormLabel>
        {errors.bio?.message && (
          <Text color="red.500">{errors.bio?.message}</Text>
        )}
      </FormControl>

      <FormControl variant="floating" isRequired>
        <Textarea
          _focus={{
            boxShadow: "0px 0px 10px 2px #9A66FF",
            borderColor: "#9A66FF",
            outline: "none",
          }}
          w="full"
          outline="none"
          border="1px solid"
          borderColor="#4B3678"
          borderRadius="9px"
          py={6}
          placeholder=""
          my="2 !important"
          {...register("events", {
            required: {
              value: true,
              message: `this field is required`,
            },
          })}
        />
        <FormLabel>{"Which clubIRL events have you attended?"}</FormLabel>
        {errors.events?.message && (
          <Text color="red.500">{errors.events?.message}</Text>
        )}
      </FormControl>

      <FormControl variant="floating" isRequired>
        <Textarea
          _focus={{
            boxShadow: "0px 0px 10px 2px #9A66FF",
            borderColor: "#9A66FF",
            outline: "none",
          }}
          w="full"
          outline="none"
          border="1px solid"
          borderColor="#4B3678"
          borderRadius="9px"
          py={6}
          placeholder=""
          my="2 !important"
          {...register("connections", {
            required: {
              value: true,
              message: `this field is required`,
            },
          })}
        />
        <FormLabel>{"Who do you know in clubIRL?"}</FormLabel>
        {errors.connections?.message && (
          <Text color="red.500">{errors.connections?.message}</Text>
        )}
      </FormControl>

      <FormControl variant="floating" isRequired>
        <Select
          _focus={{
            boxShadow: "0px 0px 10px 2px #9A66FF",
            borderColor: "#9A66FF",
            outline: "none",
          }}
          w="full"
          outline="none"
          border="1px solid"
          borderColor="#4B3678"
          borderRadius="9px"
          py={6}
          placeholder=""
          my="2 !important"
          {...register("communication", {
            required: {
              value: true,
              message: `${"communication"} is required`,
            },
          })}
        >
          <option value="telegram">Telegram</option>
          <option value="twitter">Twitter</option>
          <option value="discord">Discord</option>
          <option value="email">Email</option>
        </Select>
        <FormLabel>Preferred method of communication</FormLabel>
        {errors.communication?.message && (
          <Text color="red.500">{errors.communication?.message}</Text>
        )}
      </FormControl>

      <FormControl variant="floating">
        <Input
          _focus={{
            boxShadow: "0px 0px 10px 2px #9A66FF",
            borderColor: "#9A66FF",
            outline: "none",
          }}
          w="full"
          outline="none"
          border="1px solid"
          borderColor="#4B3678"
          borderRadius="9px"
          py={6}
          placeholder=""
          my="2 !important"
          {...register("handle")}
        />
        <FormLabel>{"Your handle (on selected platform):"}</FormLabel>
        {errors.handle?.message && (
          <Text color="red.500">{errors.handle?.message}</Text>
        )}
      </FormControl>

      <Flex gap={2}>
        <Checkbox
          colorScheme="purple"
          borderColor="#9A66FF"
          _checked={{
            borderColor: "#9A66FF",
          }}
          onChange={(e) => setIsAccepted(e.target.checked)}
        />
        <Text
          color="#9A66FF"
          fontWeight="700"
          fontSize="14px"
          lineHeight="21px"
        >
          I agree to the{" "}
          <Link
            href="https://thirdweb.com/thirdweb_Privacy_Policy_May_2022.pdf"
            textDecor="underline"
            _hover={{ color: "white" }}
            isExternal
          >
            privacy policy
          </Link>
        </Text>
      </Flex>
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
        disabled={!isAccepted}
      >
        <Text
          bg="linear-gradient(93.33deg, #F213A4 1.94%, #7A66FF 100%)"
          backgroundClip="text"
          textColor="transparent"
        >
          Register
        </Text>
      </Button>
    </FormControl>
  );
};
