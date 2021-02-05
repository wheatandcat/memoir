import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { FontSize, styleFontSize } from 'lib/styledSystem/styleFontSize';
import { FontWeight, styleFontWeight } from 'lib/styledSystem/styleFontWeight';
import { FontColor, styleFontColor } from 'lib/styledSystem/styleFontColor';

type Props = {
  size?: FontSize;
  fontWeight?: FontWeight;
  color?: FontColor;
};

const Text: React.FC<Props> = (props) => {
  const style = {
    ...styleFontSize(props),
    ...styleFontWeight(props),
    ...styleFontColor(props),
  } as TextStyle;

  return <RNText {...props} style={style} />;
};

export default Text;
