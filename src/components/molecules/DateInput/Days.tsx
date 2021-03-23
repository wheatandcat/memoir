import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';
import Text from 'components/atoms/Text';
import View from 'components/atoms/View';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Carousel from 'react-native-snap-carousel';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

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

const getDayOfWeekColor = (day: string, selected: boolean) => {
  if (selected) {
    return 'primary';
  }

  return 'secondary';
};

const renderItem: React.FC<RenderedItemProps> = ({ item }) => {
  const selected = dayjs(item.day).format('D') === dayjs(item.date).format('D');

  return (
    <TouchableOpacity
      onPress={() => item.onPress(dayjs(item.day).format('DD'))}
    >
      <View style={styles.dayItem}>
        <Text textAlign="center" color={selected ? 'primary' : 'secondary'}>
          {dayjs(item.day).format('D')}
          {'\n'}
          <Text
            textAlign="center"
            variants="small"
            color={getDayOfWeekColor(item.day, selected)}
          >
            {dayjs(item.day).format('dd')}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DayInput: React.FC<Props> = (props) => {
  const index = Number(dayjs(props.date).format('D'));

  const days = (): string[] => {
    const first = props.days.slice(index, props.days.length);
    const last = props.days.slice(0, index);
    return [...first, ...last];
  };

  const [dayItems] = useState(days());

  const carouselRef = useRef<Carousel<any>>(null);
  const windowWidth = useWindowDimensions().width;

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item);
    },
    []
  );

  useEffect(() => {
    const item = dayItems.findIndex(
      (v) => dayjs(props.date).format('D') === dayjs(v).format('D')
    );

    carouselRef.current?.snapToItem(item);
  }, [dayItems, props.date]);

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
      initialNumToRender={3}
      loop
    />
  );
};

export default memo(DayInput);

const styles = StyleSheet.create({
  dayItem: {
    paddingRight: theme().space(4),
  },
});
