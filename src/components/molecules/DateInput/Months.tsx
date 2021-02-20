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

type Month = {
  label: string;
  value: number;
};

type Props = {
  date: string;
  months: Month[];
  onPress: (month: string) => void;
};

type RenderedItem = {
  date: string;
  month: Month;
  onPress: (month: string) => void;
};

type RenderedItemProps = ListRenderItemInfo<RenderedItem>;

const renderItem: React.FC<RenderedItemProps> = ({ item }) => {
  return (
    <TouchableOpacity
      key={item.month.value}
      onPress={() => item.onPress(('00' + item.month.value).slice(-2))}
    >
      <View style={styles.monthItem}>
        <Text
          color={
            String(item.month.value) === dayjs(item.date).format('M')
              ? 'primary'
              : 'secondary'
          }
        >
          {item.month.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MonthInput: React.FC<Props> = (props) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const windowWidth = useWindowDimensions().width;

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item);
    },
    []
  );

  const index = Number(dayjs(props.date).format('M')) - 1;

  return (
    <Carousel
      ref={carouselRef}
      data={props.months.map((v) => ({
        date: props.date,
        month: v,
        onPress: props.onPress,
      }))}
      renderItem={renderItemCall}
      sliderWidth={windowWidth}
      itemWidth={70}
      layout="default"
      inactiveSlideOpacity={1.0}
      inactiveSlideScale={1.0}
      activeSlideAlignment="start"
      loop
      onLayout={() => {
        carouselRef.current?.snapToItem(index);
      }}
    />
  );
};

export default memo(MonthInput);

const styles = StyleSheet.create({
  monthItem: {
    paddingRight: theme().space(3),
  },
});
