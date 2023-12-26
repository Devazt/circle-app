import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  
};

const fonts = {
  heading: `Righteous`,
  body: `font-family: 'Montserrat Variable', sans-serif`
};

const theme = extendTheme({ config }, { fonts });

export default theme;
