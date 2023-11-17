import { nanoid } from "nanoid/non-secure";
import { palette } from "../theme/colors";

/**
 * Represents a color with its unique identifier, color code, and name.
 */
interface IColor {
  id: string;
  code: string;
  name: string;
}

/**
 * Retrieves an array of colors based on the provided color palette.
 *
 * @returns {IColor[]} An array of color objects.
 */
export const getColors = (): IColor[] => {
  const colors: IColor[] = Object.keys(palette).map((paletteColor) => {
    return {
      id: `color_${nanoid()}`,
      code: palette[paletteColor as keyof typeof palette],
      name: paletteColor,
    };
  });
  return colors;
};

/**
 * Generates a random color index up to the specified maximum value.
 *
 * @param {number} max - The maximum value for the random color index.
 * @returns {number} A random color index.
 */
export const getRandomColor = (max: number): number => {
  return Math.floor(Math.random() * max);
};
