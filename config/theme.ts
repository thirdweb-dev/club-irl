import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `"Space Mono", system-ui, sans-serif`,
    body: `"Roboto Mono", system-ui, sans-serif`,
  },
});

export default theme;
