import React, { memo } from 'react';
import { TouchableWithoutFeedback, StyleSheet, ViewStyle } from 'react-native';
import Image from 'components/atoms/Image';
import theme from 'config/theme';
import View from 'components/atoms/View';

type Props = {
  like: boolean;
  dislike: boolean;
  onLike: () => void;
  onDislike: () => void;
};

const Compatibility: React.FC<Props> = (props) => {
  const likeStyle: ViewStyle[] = [styles.image];
  const dislikeStyle: ViewStyle[] = [styles.image];
  if (props.like) {
    likeStyle.push(styles.selected);
  }
  if (props.dislike) {
    dislikeStyle.push(styles.selected);
  }

  return (
    <View style={styles.root}>
      <View style={likeStyle}>
        <TouchableWithoutFeedback onPress={props.onLike}>
          <Image
            source={require('../../../img/icon/icon_like.png')}
            width={64}
            height={64}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={dislikeStyle}>
        <TouchableWithoutFeedback onPress={props.onDislike}>
          <Image
            source={require('../../../img/icon/icon_dislike.png')}
            width={64}
            height={64}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default memo(Compatibility);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 95,
  },
  image: {
    marginHorizontal: theme().space(2),
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: theme().color.primary.light,
    borderRadius: 45,
  },
});
