import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Image from 'components/atoms/Image';
import theme from 'config/theme';

export type Props = {
  image: string | null;
  size?: number;
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
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('../../../img/icon/icon_account_default.png')}
          width={props.size}
          height={props.size}
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
});

UserImage.defaultProps = {
  size: 100,
};

export default memo(UserImage);
