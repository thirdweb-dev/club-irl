 import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const activeLabelStyles = {
  transform: "scale(0.8) translateY(-14px)",
  fontSize: "14px",
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `"Space Mono", system-ui, sans-serif`,
    body: `"Roboto Mono", system-ui, sans-serif`,
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 6,
              transformOrigin: "left top",
              color: "#9A66FF",
              fontWeight: 700,
            },
          },
        },
      },
    },
  },
});

export default theme;
