import {
  Button,
  FormControl,
  Heading,
  Text,
  useToast,
  Input,
  Select,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();
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
      await router.replace("/members");
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
        Edit Profile
      </Heading>
      <Text my="6 !important">
        Edit and update your profile for clubIRL. This will be used to update
        you on future events and opportunties and connect you with relevant
        executives (with your permission).
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

      <Flex gap={5} my={5}>
        <CheckboxGroup>
          <Checkbox
            size="lg"
            colorScheme="purple"
            borderColor="#9A66FF"
            _checked={{
              borderColor: "#9A66FF",
            }}
            {...register("shared_channel")}
          />
        </CheckboxGroup>
        <Text fontSize="sm" textAlign="left">
          Do you want to be added to the clubIRL shared communications channel?
        </Text>
      </Flex>
      {errors.handle?.message && (
        <Text color="red.500">{errors.handle?.message}</Text>
      )}

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
          Save
        </Text>
      </Button>
    </FormControl>
  );
};
