import React, { memo, useCallback, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'lib/dayjs';
import { ConnectedType } from 'components/pages/Home/Connected';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';

type Props = {
  date: string;
} & Pick<ConnectedType, 'onChangeDate' | 'items'>;

const GestureRecognizerWrap: React.FC<Props> = (props) => {
  const scrollingRef = useRef<boolean>(false);

  const onStartScroll = useCallback(() => {
    scrollingRef.current = true;
  }, []);

  const onEndScroll = useCallback(() => {
    scrollingRef.current = false;
  }, []);

  const onSwipeLeft = useCallback(() => {
    if (scrollingRef.current) return;

    props.onChangeDate(dayjs(props.date).add(1, 'day').format('YYYY-MM-DD'));
  }, [props]);

  const onSwipeRight = useCallback(() => {
    if (scrollingRef.current) return;

    props.onChangeDate(dayjs(props.date).add(-1, 'day').format('YYYY-MM-DD'));
  }, [props]);

  const onPanGestureEvent = useCallback(
    (event) => {
      const { nativeEvent } = event;
      if (nativeEvent.velocityX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    },
    [onSwipeRight, onSwipeLeft]
  );

  const style: ViewStyle[] = [styles.inner];
  if (props.items.length > 3) {
    style.push({ paddingBottom: (props.items.length - 2) * 55 });
  }

  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        <PanGestureHandler onActivated={onPanGestureEvent}>
          <ScrollView
            removeClippedSubviews
            onScrollBeginDrag={onStartScroll}
            onScrollEndDrag={onEndScroll}
            style={styles.scroll}
          >
            <View style={style}>{props.children}</View>
          </ScrollView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default memo<React.FC<Props>>(GestureRecognizerWrap);

const styles = StyleSheet.create({
  inner: {
    height: '100%',
  },
  scroll: {
    height: '100%',
  },
  root: {
    height: '100%',
  },
});
