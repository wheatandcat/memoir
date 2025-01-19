import useIsFirstRender from "@/hooks/useIsFirstRender";
import type React from "react";
import { memo, useEffect, useRef } from "react";
import { Animated } from "react-native";

export type Props = {
  children?: React.ReactNode;
};

const fadeOut = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start((event) => {
    if (event.finished) {
      fadeIn(fadeAnim);
    }
  });
};

const fadeIn = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  }).start((event) => {
    if (event.finished) {
      fadeOut(fadeAnim);
    }
  });
};

const Blinking: React.FC<Props> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
      fadeOut(fadeAnim);
    }
  }, [isFirstRender, fadeAnim]);

  const style = { opacity: fadeAnim };

  return (
    <Animated.View style={style} testID="blinking">
      {props.children}
    </Animated.View>
  );
};
export default memo<React.FC<Props>>(Blinking);
