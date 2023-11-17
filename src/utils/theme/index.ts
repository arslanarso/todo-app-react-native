import { createBox, createText, createTheme } from "@shopify/restyle";
import { colors } from "./colors";
import { textVariants } from "./textVariants";

/**
 * Defines the configuration for the theme, including colors, text variants, spacing, and border radii.
 */
export const theme = createTheme({
  breakpoints: {},
  colors: colors,
  textVariants: textVariants,
  spacing: {
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "10": 40,
  },
  borderRadii: {
    rounded: 4,
    roundedXl: 8,
    rounded2Xl: 16,
  },
});

/**
 * Represents the type of the theme.
 */
export type Theme = typeof theme;

/**
 * Creates a themed box component using the specified theme.
 */
export const Box = createBox<Theme>();

/**
 * Creates a themed text component using the specified theme.
 */
export const Text = createText<Theme>();

export default theme;
