import React from 'react';
import { Image as RNImage, ImageProps, ImageStyle } from 'expo-image';

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

  const styles: ImageStyle[] = [style];
  if (props.style) {
    styles.push(props.style);
  }

  return <RNImage {...imageProps} style={styles} />;
};

export default Image;
