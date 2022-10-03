import {
  Flex,
  Text,
  keyframes,
  ComponentWithAs,
  FlexProps,
} from "@chakra-ui/react";

const slide = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

interface AnimateTextProps {
  delay: string;
  [key: string]: any;
}

export const AnimateText: React.FC<AnimateTextProps> = ({
  children,
  delay,
  ...props
}) => {
  return (
    <Flex maxWidth="100%" overflow="hidden" {...props}>
      <Flex
        display="inline-block"
        whiteSpace="nowrap"
        animation={`${slide} ${delay} linear infinite`}
      >
        <Text size="md" display="inline-block">
          {children}
        </Text>
        <Text size="md" display="inline-block">
          {children}
        </Text>
      </Flex>
    </Flex>
  );
};
