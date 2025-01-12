import { memo, type FC } from 'react';
import { StyleSheet, type ImageProps } from 'react-native';
import Image from '@/components/elements/Image';
import theme from 'config/theme';

export type Props = {
  image: string | null;
  size?: number;
  onLoadEnd?: ImageProps['onLoadEnd'];
};

const UserImage: FC<Props> = ({
  size = 100,
  ...props
}) => {
  return (
    <>
      {props.image ? (
        <Image
          source={{ uri: props.image }}
          style={styles.image}
          width={size}
          height={size}
          contentFit="cover"
          onLoadEnd={props.onLoadEnd}
        />
      ) : (
        <Image
          source={require('@/src/img/icon/icon_account_default.png')}
          width={size}
          height={size}
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

export default memo(UserImage);
