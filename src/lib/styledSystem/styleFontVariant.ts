import { TextStyle } from 'react-native';
import { variants } from 'config/theme';

export type FontVariants = keyof typeof variants.text;

type Props = {
  variants?: FontVariants;
};

export const styleFontVariant = (props: Props): TextStyle => {
  if (!props.variants) {
    return {};
  }

  const item = variants.text[props.variants ?? 'body'];

  return {
    fontSize: item.size,
    fontWeight: item.fontWeight,
    color: item.color,
  };
};
