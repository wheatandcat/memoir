import React from 'react';
import { Text as RNText, TextStyle, TextProps, Platform } from 'react-native';
import { FontSize, styleFontSize } from 'lib/styledSystem/styleFontSize';
import { FontWeight, styleFontWeight } from 'lib/styledSystem/styleFontWeight';
import { FontColor, styleFontColor } from 'lib/styledSystem/styleFontColor';
import { styleFontLineHeight } from 'lib/styledSystem/styleFontLineHeight';
import { useFonts } from 'expo-font';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';

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
  underline?: boolean;
  lineHeight?: number;
  fontFamily?: FontFamily;
};

const Text: React.FC<Props> = (props) => {
  let [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': RobotoCondensed_700Bold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
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
  if (props.underline) style.textDecorationLine = 'underline';

  const r = {
    ...style,
    fontFamily: props.fontFamily,
  };

  if (Platform.OS === 'android') {
    delete r.fontWeight;
  }

  return r;
};

Text.defaultProps = {
  variants: 'body',
  fontFamily: 'RobotoCondensed-Bold',
};

export default Text;
