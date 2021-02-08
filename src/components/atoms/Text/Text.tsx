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

type Props = TextProps & {
  variants?: FontVariants;
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
  textAlign?: TextStyle['textAlign'];
  lineHeight?: number;
};

const Text: React.FC<Props> = (props) => {
  const [loaded] = useFonts({
    RobotoCondensed: require('../../../../assets/RobotoCondensed-Bold.ttf'),
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

  return { ...style, fontFamily: 'RobotoCondensed' };
};

Text.defaultProps = {
  variants: 'body',
};

export default Text;
