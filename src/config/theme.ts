const SPACE = [2, 4, 8, 16, 32, 64, 128, 256, 512] as const;

const baseColor = {
  primary: {
    light: '#F9E281',
    main: '#E3C95D',
    dark: '#D2B849',
  },
  secondary: {
    light: '#5E5166',
    main: '#362740',
    dark: '#2B1F32',
  },
  base: {
    light: '#F2F2F2',
    main: '#D8D7D6',
    dark: '#B8B8B8',
  },
  accent1: {
    light: '#9DF18F',
    main: '#59CC46',
    dark: '#46AE35',
  },
  accent2: {
    light: '#FFEE5C',
    main: '#FFE600',
    dark: '#E5CE00',
  },
  error: {
    light: '#F680B2',
    main: '#E93581',
    dark: '#CA1D65',
  },
  background: {
    light: '#FFFFFF',
    main: '#F2F2F2',
    dark: '#D8D7D6',
  },
  transparent: 'transparent',
};

const category = {
  color: {
    category1: '#FF8383',
    category2: '#FFE600',
    category3: '#9BDC5A',
    category4: '#5AD4DC',
    category5: '#DE9FE9',
  },
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
    category: category,
  };
};

export const variants = {
  text: {
    small: {
      size: theme().fontSizes.xs,
      fontWeight: theme().fontWeights.bold,
      color: theme().fontColors.secondary,
    },
    body: {
      size: theme().fontSizes.base,
      fontWeight: theme().fontWeights.bold,
      color: theme().fontColors.secondary,
    },
    middle: {
      size: theme().fontSizes.lg,
      fontWeight: theme().fontWeights.bold,
      color: theme().fontColors.secondary,
    },
    large: {
      size: theme().fontSizes.xl,
      fontWeight: theme().fontWeights.bold,
      color: theme().fontColors.secondary,
    },
    logo: {
      size: theme().fontSizes.xl2,
      fontWeight: theme().fontWeights.bold,
      color: theme().fontColors.secondary,
    },
  },
};

export default theme;
