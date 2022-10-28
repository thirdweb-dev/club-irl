import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormInput } from "./FormInput";

export const Form = () => {
  return (
    <VStack
      bg="black"
      boxShadow="0px 0px 50px #8B38FF"
      rounded="xl"
      w="570px"
      textAlign="center"
      p={16}
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum
        quis urna eget convallis. Cras orci enim, mattis eu purus sit amet,
        gravida pharetra lorem. Fusce porta sed mi quis pharetra.
      </Text>
      <FormInput placeholder="Your name:" />
      <FormInput placeholder="Your email:" />
      <FormInput placeholder="Your address:" />
      <Flex gap={2}>
        <Checkbox
          colorScheme="purple"
          borderColor="#9A66FF"
          _checked={{
            borderColor: "#9A66FF",
          }}
        />
        <Text
          color="#9A66FF"
          fontWeight="700"
          fontSize="14px"
          lineHeight="21px"
        >
          I agree to the privacy policy
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
      >
        <Text
          bg="linear-gradient(93.33deg, #F213A4 1.94%, #7A66FF 100%)"
          backgroundClip="text"
          textColor="transparent"
        >
          Register
        </Text>
      </Button>
    </VStack>
  );
};
