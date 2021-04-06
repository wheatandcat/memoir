import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  ViewStyle,
  Platform,
  useWindowDimensions,
} from 'react-native';
import View from 'components/atoms/View';
import GestureRecognizer from 'react-native-swipe-gestures';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { ConnectedType } from 'components/pages/Home/Connected';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  date: string;
} & Pick<ConnectedType, 'onChangeDate' | 'items'>;

const GestureRecognizerWrap: React.FC<Props> = (props) => {
  const height = useWindowDimensions().height;

  const onSwipeLeft = useCallback(() => {
    props.onChangeDate(dayjs(props.date).add(1, 'day').format('YYYY-MM-DD'));
  }, [props]);

  const onSwipeRight = useCallback(() => {
    props.onChangeDate(dayjs(props.date).add(-1, 'day').format('YYYY-MM-DD'));
  }, [props]);

  const swipeStyle: ViewStyle[] = [
    {
      ...Platform.select({
        ios: {
          height:
            props.items.length > 3
              ? props.items.length * 120
              : height * (2 / 3),
        },
        android: {
          flex: 1,
        },
      }),
    },
  ];

  const style: ViewStyle[] = [];
  if (props.items.length > 3) {
    style.push(styles.inner);
  }

  if (Platform.OS === 'ios') {
    if (props.items.length > 3) {
      swipeStyle.push({ paddingBottom: 100 });
    }

    return (
      <ScrollView alwaysBounceVertical={false} style={style}>
        <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={swipeStyle}
        >
          <View style={style}>{props.children}</View>
        </GestureRecognizer>
      </ScrollView>
    );
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
        gestureIsClickThreshold: 30,
      }}
      style={swipeStyle}
    >
      <ScrollView removeClippedSubviews>
        <View style={style}>{props.children}</View>
      </ScrollView>
    </GestureRecognizer>
  );
};

export default memo<React.FC<Props>>(GestureRecognizerWrap);

const styles = StyleSheet.create({
  inner: {
    paddingBottom: theme().space(3),
  },
});
