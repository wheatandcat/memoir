import React, { memo, useCallback, useRef } from 'react';
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
  const carouselRef = useRef<Carousel<any>>(null);
  const windowWidth = useWindowDimensions().width;

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item);
    },
    []
  );

  const index = Number(dayjs(props.date).format('D')) - 1;

  return (
    <Carousel
      ref={carouselRef}
      data={props.days.map((v) => ({
        date: props.date,
        day: v,
        onPress: props.onPress,
      }))}
      renderItem={renderItemCall}
      sliderWidth={windowWidth}
      itemWidth={55}
      layout="default"
      inactiveSlideOpacity={1.0}
      inactiveSlideScale={1.0}
      activeSlideAlignment="start"
      firstItem={props.firstItem ? index : undefined}
      onLayout={() => {
        carouselRef.current?.snapToItem(index);
      }}
    />
  );
};

export default memo(DayInput);

const styles = StyleSheet.create({
  dayItem: {
    paddingRight: theme().space(4),
  },
});
