import React from 'react';
import { Image as RNImage, ImageProps, ImageStyle } from 'react-native';

export type Props = ImageProps & {
  style?: ImageStyle;
  width?: number | string;
  height?: number | string;
};

const Image: React.FC<Props> = (props) => {
  const { width, height, ...imageProps } = props;
  const style: ImageStyle = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (Object.keys(props.source).length === 0) {
    return <RNImage {...imageProps} source={1} style={[style, props.style]} />;
  }

  return <RNImage {...imageProps} style={[style, props.style]} />;
};

export default Image;
