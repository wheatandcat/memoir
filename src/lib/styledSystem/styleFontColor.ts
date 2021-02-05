import { TextStyle } from 'react-native';
import theme from 'config/theme';

export type FontColor = keyof ReturnType<typeof theme>['fontColors'];

type Props = {
  color?: FontColor;
};

export const styleFontColor = (props: Props): TextStyle => {
  if (!props.color) return {};

  return {
    color: theme().fontColors[props.color],
  };
};
