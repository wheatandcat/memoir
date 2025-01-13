import { type FC, memo, useCallback, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  type ListRenderItemInfo,
} from 'react-native';
import Text from '@/components/elements/Text';
import View from '@/components/elements/View';
import theme from 'config/theme';
import dayjs from 'lib/dayjs';
import Carousel from 'react-native-snap-carousel';
import usePrevious from 'hooks/usePrevious';

type Props = {
  day: string;
  days: string[];
  onPress: (day: string) => void;
};

type RenderedItem = {
  value: string;
  day: string;
  onPress: (day: string) => void;
};

type RenderedItemProps = ListRenderItemInfo<RenderedItem>;

const getDayOfWeekColor = (selected: boolean) => {
  if (selected) {
    return 'primary';
  }

  return 'secondary';
};

const renderItem: FC<RenderedItemProps> = ({ item }) => {
  const selected = dayjs(item.day).format('D') === item.value;

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
  const index = Number(props.day);
  const carouselRef = useRef<CarouselStatic<RenderedItem>>(null);

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
  }, [props.days, prevFirstDay, days]);

  useEffect(() => {
    const currentIndex = carouselRef.current?.currentIndex || 0;

    if (currentIndex === 0 && selectIndex >= 29) {
      carouselRef.current?.snapToPrev?.();
    } else if (currentIndex === selectIndex + 1) {
      carouselRef.current?.snapToPrev?.();
    } else if (currentIndex === selectIndex - 1) {
      carouselRef.current?.snapToNext?.();
    }
  }, [selectIndex]);

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
        value: props.day,
        day: v,
        onPress: props.onPress,
      }))}
      firstItem={-1}
      initialNumToRender={6}
      renderItem={renderItemCall}
      sliderWidth={windowWidth}
      itemWidth={55}
      layout="default"
      activeSlideAlignment="start"
      inactiveSlideOpacity={1.0}
      inactiveSlideScale={1.0}
      loop
      loopClonesPerSide={dayItems.length}
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
