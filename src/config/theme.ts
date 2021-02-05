import { TextStyle } from 'react-native';
const SPACE = [2, 4, 8, 16, 32, 64, 128, 256, 512] as const;

type ColorPalette1 = {
  pale: string;
  light: string;
  main: string;
  dark: string;
};

type ColorPalette2 = {
  light: string;
  main: string;
  dark: string;
};

type ThemeColor = {
  color: {
    primary: ColorPalette1;
    secondary: ColorPalette1;
    base: ColorPalette1;
    accent1: ColorPalette1;
    accent2: ColorPalette1;
    error: ColorPalette1;
    background: ColorPalette2;
    transparent: string;
  };
};

const baseColor = {
  primary: {
    pale: '#D5EEE2',
    light: '#5DC894',
    main: '#006835',
    dark: '#003119',
  },
  secondary: {
    pale: '#F4FFBE',
    light: '#E6F599',
    main: '#ADCF01',
    dark: '#7F9705',
  },
  base: {
    pale: '#DBDBDB',
    light: '#9D9D9D',
    main: '#4F4F4F',
    dark: '#110f0f',
  },
  accent1: {
    pale: '#E5F0FF',
    light: '#A8C9F5',
    main: '#2F80ED',
    dark: '#034092',
  },
  accent2: {
    pale: '#FFFAEA',
    light: '#FFEDB5',
    main: '#F2C94C',
    dark: '#BE9109',
  },
  error: {
    pale: '#FFEBEB',
    light: '#FFABAB',
    main: '#E15757',
    dark: '#A81A1A',
  },
  background: {
    light: '#FAFAFA',
    main: '#ffffff',
    dark: '#000000',
  },
  transparent: 'transparent',
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  base: 18,
  lg: 24,
  xl: 36,
  xl2: 48,
};

type FontWeight = {
  thin: '100';
  normal: '400';
  bold: 'bold';
};

export const FONT_WEIGHT: FontWeight = {
  thin: '100',
  normal: '400',
  bold: 'bold',
};

export const FONT_COLOR = {
  primary: baseColor.primary.main,
  secondary: baseColor.secondary.main,
  base: baseColor.base.main,
  accent1: baseColor.accent1.main,
  accent2: baseColor.accent2.main,
  error: baseColor.error.main,
};

const theme = () => {
  return {
    color: baseColor,
    space: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => SPACE[index],
    fontSizes: FONT_SIZE,
    fontWeights: FONT_WEIGHT,
    fontColors: FONT_COLOR,
  };
};

export default theme;
