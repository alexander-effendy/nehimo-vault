import * as colorsys from 'colorsys';

interface HSL {
  h: number;
  s: number;
  l: number;
}

const hexToHSL = (hexColor: string): HSL => {
  const { h, s, l } = colorsys.hexToHsl(hexColor);
  return { h: h / 360, s: s / 100, l: l / 100 };
};

const hslToHex = (hsl: HSL): string => {
  const { h, s, l } = hsl;
  return colorsys.hslToHex(h * 360, s * 100, l * 100);
};

const getDarkerColor = (hexColor: string, darknessDifference: number): string => {
  const hsl = hexToHSL(hexColor);
  const darkerL = Math.max(0, Math.min(1, hsl.l - darknessDifference));
  return hslToHex({ ...hsl, l: darkerL });
};

// const ColorGradientGenerator = (userColor: string, darknessDifference: number) => {
//   const darkerColor = getDarkerColor(userColor, darknessDifference);

//   return `linear-gradient(to bottom, ${userColor} 0%, ${darkerColor} 40%, ${fixedColor} 100%)`;
// };

export default getDarkerColor;