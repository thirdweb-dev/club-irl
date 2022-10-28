import { Input, InputProps } from "@chakra-ui/react";
import type { FC } from "react";

interface IFormInput extends InputProps {
  placeholder: string;
}

export const FormInput: FC<IFormInput> = ({ placeholder, ...props }) => {
  return (
    <Input
      _focus={{
        boxShadow: "0px 0px 10px 2px #9A66FF",
        borderColor: "#9A66FF",
        outline: "none",
      }}
      _placeholder={{
        color: "#9A66FF",
        fontWeight: 700,
      }}
      w="full"
      outline="none"
      border="1px solid"
      borderColor="#4B3678"
      borderRadius="9px"
      {...props}
      h="53px"
      placeholder={placeholder}
      my="2 !important"
    />
  );
};
