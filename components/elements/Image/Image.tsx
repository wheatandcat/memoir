import { Image as RNImage } from "expo-image";
import type { ImageProps, ImageStyle } from "expo-image";
import type { FC } from "react";

export type Props = ImageProps & {
  style?: ImageStyle;
  width?: number;
  height?: number;
};

const Image: FC<Props> = (props) => {
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
