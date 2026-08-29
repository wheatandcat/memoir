import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { memo, useCallback, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const ITEM_PADDING_RIGHT = theme().space(2);

type Props = {
  year: string;
  years: number[];
  onPress: (year: number) => void;
};

const YearInput: FC<Props> = (props) => {
  const scrollRef = useRef<ScrollView>(null);
  // 初期表示の年を中央に寄せるための計測値
  const selectedItem = useRef<{ x: number; width: number } | null>(null);
  const contentWidth = useRef(0);
  const scrolled = useRef(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  // 初期表示の年。選択を変えてもスクロール位置は動かさない
  const [initialYear] = useState(props.year);

  const scrollToCenter = useCallback(() => {
    if (scrolled.current) return;
    if (scrollWidth === 0 || selectedItem.current == null) return;

    const { x, width } = selectedItem.current;
    const center = x + (width - ITEM_PADDING_RIGHT) / 2;
    const offset = Math.max(center - scrollWidth / 2, 0);

    if (contentWidth.current - scrollWidth < offset) return;

    scrolled.current = true;
    scrollRef.current?.scrollTo({ x: offset, animated: false });
  }, [scrollWidth]);

  const onLayoutScrollView = useCallback((e: LayoutChangeEvent) => {
    setScrollWidth(e.nativeEvent.layout.width);
  }, []);

  const onLayoutItem = useCallback(
    (year: number) => (e: LayoutChangeEvent) => {
      if (String(year) !== initialYear) return;

      const { x, width } = e.nativeEvent.layout;
      selectedItem.current = { x, width };
      scrollToCenter();
    },
    [initialYear, scrollToCenter],
  );

  const onContentSizeChange = useCallback(
    (width: number) => {
      contentWidth.current = width;
      scrollToCenter();
    },
    [scrollToCenter],
  );

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onLayout={onLayoutScrollView}
      onContentSizeChange={onContentSizeChange}
    >
      <View style={styles.years}>
        {props.years.map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => props.onPress(year)}
            onLayout={onLayoutItem(year)}
          >
            <View style={styles.yearItem}>
              <Text
                color={String(year) === props.year ? "primary" : "secondary"}
              >
                {year}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ width: scrollWidth / 2 }} />
    </ScrollView>
  );
};

export default memo(YearInput);

const styles = StyleSheet.create({
  years: {
    flexDirection: "row",
  },
  yearItem: {
    paddingRight: ITEM_PADDING_RIGHT,
  },
});
