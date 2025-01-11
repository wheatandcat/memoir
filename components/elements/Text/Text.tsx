import type { FC } from 'react';
import {
  Text as RNText,
  type TextStyle,
  type TextProps,
  Platform,
} from 'react-native';
import { type FontSize, styleFontSize } from 'lib/styledSystem/styleFontSize';
import { type FontWeight, styleFontWeight } from 'lib/styledSystem/styleFontWeight';
import { type FontColor, styleFontColor } from 'lib/styledSystem/styleFontColor';
import { styleFontLineHeight } from 'lib/styledSystem/styleFontLineHeight';

import {
  type FontVariants,
  styleFontVariant,
} from 'lib/styledSystem/styleFontVariant';

export type FontFamily = 'RobotoCondensed-Bold' | 'NotoSansJP-Bold';

type Props = TextProps & {
  variants?: FontVariants;
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
  textAlign?: TextStyle['textAlign'];
  underline?: boolean;
  lineHeight?: number;
  fontFamily?: FontFamily;
};

const Text: FC<Props> = ({
  variants = 'body',
  fontFamily = 'RobotoCondensed-Bold',
  ...props
}) => {
  const style = {
    ...styleFontVariant(props),
    ...styleFontSize(props),
    ...styleFontWeight(props),
    ...styleFontColor(props),
    ...styleFontLineHeight(props),
  } as TextStyle;

  return <RNText {...props} style={enhanceStyle(style, props)} />;
};

const enhanceStyle = (style: TextStyle, props: Props) => {
  if (props.textAlign) style.textAlign = props.textAlign;
  if (props.underline) style.textDecorationLine = 'underline';

  const r = {
    ...style,
    fontFamily: props.fontFamily,
  };

  if (Platform.OS === 'android') {
    r.fontWeight = undefined;
  }

  return r;
};

export default Text;
