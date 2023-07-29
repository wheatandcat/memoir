import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  NativeSyntheticEvent,
} from 'react-native';
import Text from 'components/atoms/Text';
import View from 'components/atoms/View';
import theme from 'config/theme';
import PagerView from 'react-native-pager-view';

type Month = {
  label: string;
  value: number;
};

type Props = {
  month: string;
  months: Month[];
  onPress: (month: string) => void;
};

const SHOW_ITEMS = 5;
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / SHOW_ITEMS;

const MonthInput: React.FC<Props> = (props) => {
  const months = useCallback((): Month[] => {
    const index = Number(props.month);
    const first = props.months.slice(index - 1, 12);
    const last = props.months.slice(0, index - 1);
    return [...first, ...last];
  }, [props.months, props.month]);

  const generateData = useCallback((originalData: any, chunkSize: number) => {
    const result = [];
    let i = 0;

    while (true) {
      const chunk: Month[] = [];

      for (let j = 0; j < chunkSize; j++) {
        chunk.push(originalData[(i + j) % originalData.length]);
      }

      if (result.length > 0 && chunk[0].value === result[0][0].value) {
        break;
      }

      result.push(chunk);
      i += chunkSize;
    }

    return result;
  }, []);

  const pagerRef = useRef<PagerView>(null);
  const originalData = months();
  const gdata = generateData(originalData, SHOW_ITEMS);

  const [data] = useState(gdata);
  const pages = [...data.slice(-1), ...data, ...data.slice(0, 1)];

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPageWithoutAnimation(1);
    }
  }, []);

  const handlePageSelected = (e: NativeSyntheticEvent<any>) => {
    if (pagerRef.current) {
      const page = e.nativeEvent.position;
      if (page === 0) {
        pagerRef.current.setPageWithoutAnimation(page + originalData.length);
      } else if (page > originalData.length) {
        pagerRef.current.setPageWithoutAnimation(page - originalData.length);
      }
    }
  };

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={1}
      onPageSelected={handlePageSelected}
      pageMargin={10}
    >
      {pages.map((page, pageIndex) => (
        <View key={pageIndex} style={styles.page}>
          {page.map((item, itemIndex) => (
            <MonthItem
              key={itemIndex}
              value={item.value}
              label={item.label}
              selected={String(item.value) === props.month}
              onPress={props.onPress}
            />
          ))}
        </View>
      ))}
    </PagerView>
  );
};

export default memo(MonthInput);

type MonthItemProps = Month & {
  selected: boolean;
  onPress: (month: string) => void;
};

const MonthItem: React.FC<MonthItemProps> = memo((props) => {
  return (
    <TouchableWithoutFeedback
      key={props.value}
      onPress={() => props.onPress(`00${props.value}`.slice(-2))}
    >
      <View style={styles.monthItem}>
        <Text color={props.selected ? 'primary' : 'secondary'}>
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  monthItem: {
    paddingRight: theme().space(3),
    width: ITEM_WIDTH,
  },
  pagerView: {
    flex: 1,
    paddingTop: 25,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
