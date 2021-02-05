import { TextStyle } from 'react-native';
import theme from 'config/theme';

export type FontSize = keyof ReturnType<typeof theme>['fontSizes'];

type Props = {
  size?: FontSize;
};

export const styleFontSize = (props: Props): TextStyle => {
  if (!props.size) return {};

  return {
    fontSize: theme().fontSizes[props.size],
  };
};
