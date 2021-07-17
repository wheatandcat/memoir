import React from 'react';
import { Image as RNImage, ImageProps, ImageStyle } from 'react-native';

type Props = ImageProps & {
  style?: ImageStyle;
  width?: number | string;
  height?: number | string;
};

const Image: React.FC<Props> = (props) => {
  const { width, height, ...imageProps } = props;
  const style: ImageStyle = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return <RNImage {...imageProps} style={[style, props.style]} />;
};

export default Image;
