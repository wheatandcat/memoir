import React, { memo } from 'react';
import { StyleSheet, ImageProps } from 'react-native';
import Image from 'components/atoms/Image';
import theme from 'config/theme';

export type Props = {
  image: string | null;
  size?: number;
  onLoadEnd?: ImageProps['onLoadEnd'];
};

const UserImage: React.FC<Props> = (props) => {
  return (
    <>
      {props.image ? (
        <Image
          source={{ uri: props.image }}
          style={styles.image}
          width={props.size}
          height={props.size}
          contentFit="cover"
          onLoadEnd={props.onLoadEnd}
        />
      ) : (
        <Image
          source={require('../../../img/icon/icon_account_default.png')}
          width={props.size}
          height={props.size}
          style={styles.noImage}
          onLoadEnd={props.onLoadEnd}
          testID="default-user-image"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
  },
  noImage: {
    backgroundColor: theme().color.background.light,
    borderRadius: 60,
  },
});

UserImage.defaultProps = {
  size: 100,
};

export default memo(UserImage);
