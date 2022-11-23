import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import { ErrorOption, UseFormRegister } from "react-hook-form";
import { IFormData, IFormDataKeys } from "../../../types/IFormData";

interface IFormDataInput extends InputProps {
  placeholder: string;
  register: UseFormRegister<IFormData>;
  id: IFormDataKeys;
  error: ErrorOption | undefined;
}

export const FormInput: FC<IFormDataInput> = ({
  placeholder,
  register,
  id,
  error,
  ...props
}) => {
  return (
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
        {...props}
        h={14}
        placeholder=""
        my="2 !important"
        {...register(id, {
          required: {
            value: true,
            message: `${id} is required`,
          },
          validate:
            id === "email"
              ? (value) => {
                  if (value.includes("@")) {
                    return true;
                  }
                  return `${id} is not valid`;
                }
              : undefined,
        })}
      />
      <FormLabel>{placeholder}</FormLabel>
      {error?.message && <Text color="red.500">{error?.message}</Text>}
    </FormControl>
  );
};
