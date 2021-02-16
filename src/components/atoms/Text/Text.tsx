import React from 'react';
import { Text as RNText, TextStyle, TextProps } from 'react-native';
import { useFonts } from 'expo-font';
import { FontSize, styleFontSize } from 'lib/styledSystem/styleFontSize';
import { FontWeight, styleFontWeight } from 'lib/styledSystem/styleFontWeight';
import { FontColor, styleFontColor } from 'lib/styledSystem/styleFontColor';
import { styleFontLineHeight } from 'lib/styledSystem/styleFontLineHeight';
import {
  FontVariants,
  styleFontVariant,
} from 'lib/styledSystem/styleFontVariant';

export type FontFamily = 'RobotoCondensed-Bold' | 'NotoSansJP-Bold';

type Props = TextProps & {
  variants?: FontVariants;
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
  textAlign?: TextStyle['textAlign'];
  lineHeight?: number;
  fontFamily?: FontFamily;
};

const Text: React.FC<Props> = (props) => {
  const [loaded] = useFonts({
    'RobotoCondensed-Bold': require('../../../../assets/RobotoCondensed-Bold.ttf'),
    'NotoSansJP-Bold': require('../../../../assets/NotoSansJP-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

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

  return { ...style, fontFamily: props.fontFamily };
};

Text.defaultProps = {
  variants: 'body',
  fontFamily: 'RobotoCondensed-Bold',
};

export default Text;
