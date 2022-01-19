import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';
import Text from 'components/atoms/Text';
import View from 'components/atoms/View';
import theme from 'config/theme';
import dayjs from 'lib/dayjs';
import Carousel from 'react-native-snap-carousel';
import usePrevious from 'hooks/usePrevious';

type Props = {
  date: string;
  days: string[];
  onPress: (day: string) => void;
  firstItem?: boolean;
};

type RenderedItem = {
  date: string;
  day: string;
  onPress: (day: string) => void;
  firstItem?: boolean;
};

type RenderedItemProps = ListRenderItemInfo<RenderedItem>;

const getDayOfWeekColor = (selected: boolean) => {
  if (selected) {
    return 'primary';
  }

  return 'secondary';
};

const renderItem: React.FC<RenderedItemProps> = ({ item }) => {
  const selected = dayjs(item.day).format('D') === dayjs(item.date).format('D');

  return (
    <TouchableWithoutFeedback
      onPress={() => item.onPress(dayjs(item.day).format('DD'))}
    >
      <View style={styles.dayItem}>
        <Text textAlign="center" color={selected ? 'primary' : 'secondary'}>
          {dayjs(item.day).format('D')}
          {'\n'}
          <Text
            textAlign="center"
            variants="small"
            color={getDayOfWeekColor(selected)}
          >
            {dayjs(item.day).format('dd')}
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const DayInput: React.FC<Props> = (props) => {
  const prevFirstDay = usePrevious(props.days[0]);
  const index = Number(dayjs(props.date).format('D'));
  const carouselRef = useRef<Carousel<any>>(null);

  const days = useCallback((): string[] => {
    const first = props.days.slice(index - 1, props.days.length);
    const last = props.days.slice(0, index - 1);
    const list = [...first, ...last];

    return list;
  }, [props.days, index]);

  const [dayItems, setDayItems] = useState(days());

  const selectIndex = dayItems.findIndex(
    (v) => Number(dayjs(v).format('D')) === index
  );

  useEffect(() => {
    const firstDay = props.days[0];
    if (!prevFirstDay) {
      return;
    }

    if (firstDay !== prevFirstDay) {
      setDayItems(days());
      carouselRef.current?.snapToItem?.(0);
    }
  }, [props.days, prevFirstDay, setDayItems, days]);

  useEffect(() => {
    const currentIndex = carouselRef.current?.currentIndex || 0;

    if (currentIndex === 0 && selectIndex >= 29) {
      carouselRef.current?.snapToPrev?.();
    } else if (currentIndex === selectIndex + 1) {
      carouselRef.current?.snapToPrev?.();
    } else if (currentIndex === selectIndex - 1) {
      carouselRef.current?.snapToNext?.();
    }
  }, [index, selectIndex]);

  const windowWidth = useWindowDimensions().width;

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item);
    },
    []
  );

  return (
    <Carousel
      ref={carouselRef}
      data={dayItems.map((v) => ({
        date: props.date,
        day: v,
        onPress: props.onPress,
      }))}
      renderItem={renderItemCall}
      sliderWidth={windowWidth}
      itemWidth={55}
      layout="default"
      activeSlideAlignment="start"
      inactiveSlideOpacity={1.0}
      inactiveSlideScale={1.0}
      loop
      removeClippedSubviews
    />
  );
};

export default memo(DayInput);

const styles = StyleSheet.create({
  dayItem: {
    paddingRight: theme().space(4),
  },
});
