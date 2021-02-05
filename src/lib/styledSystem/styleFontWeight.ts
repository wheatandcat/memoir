import { TextStyle } from 'react-native';
import theme from 'config/theme';

export type FontWeight = keyof ReturnType<typeof theme>['fontWeights'];

type Props = {
  fontWeight?: FontWeight;
};

export const styleFontWeight = (props: Props): TextStyle => {
  if (!props.fontWeight) return {};

  return {
    fontWeight: theme().fontWeights[props.fontWeight],
  };
};
