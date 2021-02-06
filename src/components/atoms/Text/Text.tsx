import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { FontSize, styleFontSize } from 'lib/styledSystem/styleFontSize';
import { FontWeight, styleFontWeight } from 'lib/styledSystem/styleFontWeight';
import { FontColor, styleFontColor } from 'lib/styledSystem/styleFontColor';
import {
  FontVariants,
  styleFontVariant,
} from 'lib/styledSystem/styleFontVariant';

type Props = {
  variants?: FontVariants;
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
  textAlign?: TextStyle['textAlign'];
};

const Text: React.FC<Props> = (props) => {
  const [loaded] = useFonts({
    Montserrat: require('../../../../assets/RobotoCondensed-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const style = {
    ...styleFontVariant(props),
    ...styleFontSize(props),
    ...styleFontWeight(props),
    ...styleFontColor(props),
  } as TextStyle;

  return <RNText {...props} style={enhanceStyle(style, props)} />;
};

const enhanceStyle = (style: TextStyle, props: Props) => {
  if (props.textAlign) style.textAlign = props.textAlign;

  return style;
};

Text.defaultProps = {
  variants: 'body',
};

export default Text;
