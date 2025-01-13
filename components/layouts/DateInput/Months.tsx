import { type FC, memo, useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  type ListRenderItemInfo,
} from 'react-native';
import Text from '@/components/elements/Text';
import View from '@/components/elements/View';
import theme from 'config/theme';
import Carousel from 'react-native-snap-carousel';

type Month = {
  label: string;
  value: number;
};

type Props = {
  month: string;
  months: Month[];
  onPress: (month: string) => void;
};

type RenderedItem = {
  value: string;
  month: Month;
  onPress: (month: string) => void;
};

type RenderedItemProps = ListRenderItemInfo<RenderedItem>;

const renderItem: FC<RenderedItemProps> = ({ item }) => {
  return (
    <TouchableWithoutFeedback
      key={item.month.value}
      onPress={() => item.onPress(`00${item.month.value}`.slice(-2))}
    >
      <View style={styles.monthItem}>
        <Text
          color={
            String(item.month.value) === item.value ? 'primary' : 'secondary'
          }
        >
          {item.month.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MonthInput: React.FC<Props> = (props) => {
  const months = useCallback((): Month[] => {
    const index = Number(props.month);
    const first = props.months.slice(index - 1, 12);
    const last = props.months.slice(0, index - 1);
    return [...first, ...last];
  }, [props.month, props.months]);

  const [monthItems] = useState(months());

  const carouselRef = useRef<Carousel<RenderedItem>>(null);
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
      data={monthItems.map((v) => ({
        value: props.month,
        month: v,
        onPress: props.onPress,
      }))}
      firstItem={-1}
      initialNumToRender={6}
      renderItem={renderItemCall}
      sliderWidth={windowWidth}
      itemWidth={75}
      layout="default"
      inactiveSlideOpacity={1.0}
      inactiveSlideScale={1.0}
      activeSlideAlignment="start"
      loop
      loopClonesPerSide={monthItems.length}
      removeClippedSubviews
    />
  );
};

export default memo(MonthInput);

const styles = StyleSheet.create({
  monthItem: {
    paddingRight: theme().space(3),
  },
});
