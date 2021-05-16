import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Image from 'components/atoms/Image';

export type Props = {
  image: string | null;
};

const UserImage: React.FC<Props> = (props) => {
  return (
    <>
      {props.image ? (
        <Image
          source={{ uri: props.image }}
          style={styles.image}
          width={100}
          height={100}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('../../../img/icon/icon_account_default.png')}
          width={100}
          height={100}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 60,
  },
});

export default memo(UserImage);
