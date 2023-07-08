import React, { memo } from 'react';
import { TouchableWithoutFeedback, StyleSheet, ViewStyle } from 'react-native';
import Image from 'components/atoms/Image';
import theme from 'config/theme';
import View from 'components/atoms/View';

type Props = {
  like: boolean;
  dislike: boolean;
  size?: number;
  opacity?: boolean;
  onLike: () => void;
  onDislike: () => void;
};

const Compatibility: React.FC<Props> = (props) => {
  const likeStyle: ViewStyle[] = [styles.image];
  const dislikeStyle: ViewStyle[] = [styles.image];
  if (props.like && !props.opacity) {
    likeStyle.push(styles.selected);
  }
  if (props.dislike && !props.opacity) {
    dislikeStyle.push(styles.selected);
  }

  if (props.opacity && !props.like) {
    likeStyle.push(styles.opacity);
  }

  if (props.opacity && !props.dislike) {
    dislikeStyle.push(styles.opacity);
  }

  return (
    <View style={styles.root}>
      <View style={likeStyle}>
        <TouchableWithoutFeedback onPress={props.onLike} testID="input_like">
          <Image
            source={require('../../../img/icon/icon_like.png')}
            width={props.size}
            height={props.size}
            contentFit="contain"
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={dislikeStyle}>
        <TouchableWithoutFeedback
          onPress={props.onDislike}
          testID="input_dislike"
        >
          <Image
            source={require('../../../img/icon/icon_dislike.png')}
            width={props.size}
            height={props.size}
            contentFit="contain"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

Compatibility.defaultProps = {
  size: 64,
  opacity: false,
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
  opacity: {
    opacity: 0.3,
  },
});
