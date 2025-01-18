import View from "@/components/elements/View";
import type { ConnectedType } from "@/features/home/components/type";
import dayjs from "lib/dayjs";
import { type FC, memo, useCallback } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import {
  GestureHandlerRootView,
  type HandlerStateChangeEvent,
  PanGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";

type Props = {
  date: string;
  children: React.ReactNode;
} & Pick<ConnectedType, "onChangeDate" | "items">;

const velocityThreshold = 0.3;
const directionalOffsetThreshold = 80;

const isValidSwipe = (velocity: number, directionalOffset: number) => {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
};

const GestureRecognizerWrap: FC<Props> = (props) => {
  const onSwipeLeft = useCallback(() => {
    props.onChangeDate(dayjs(props.date).add(1, "day").format("YYYY-MM-DD"));
  }, [props]);

  const onSwipeRight = useCallback(() => {
    props.onChangeDate(dayjs(props.date).add(-1, "day").format("YYYY-MM-DD"));
  }, [props]);

  const onPanGestureEvent = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (event: HandlerStateChangeEvent<any>) => {
      const { nativeEvent } = event;

      if (Math.abs(nativeEvent.velocityY) > 300) {
        return;
      }

      if (!isValidSwipe(nativeEvent.velocityX, nativeEvent.translationX)) {
        return;
      }

      if (nativeEvent.velocityX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    },
    [onSwipeRight, onSwipeLeft],
  );

  const style: ViewStyle[] = [styles.inner];
  if (props.items.length > 3) {
    style.push({ paddingBottom: (props.items.length - 2) * 55 });
  }

  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        <PanGestureHandler onActivated={onPanGestureEvent}>
          <ScrollView removeClippedSubviews style={styles.scroll}>
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
    height: "100%",
  },
  scroll: {
    height: "100%",
  },
  root: {
    height: "100%",
  },
});
