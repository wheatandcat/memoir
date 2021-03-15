import React, { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import View from 'components/atoms/View';
import Card from 'components/organisms/Card';
import DateText from 'components/molecules/Memoir/DateText';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  onItem: () => void;
};

const items = [
  {
    date: '2021-01-01',
    title: '本読んだ',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
  {
    date: '2021-01-01',
    title:
      '「とても長いタイトルの本」を読んだんだけど、もっと長いタイトルの本です',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
  {
    date: '2021-01-02',
    title: 'ゴミを捨てた',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
  {
    date: '2021-01-03',
    title: '公園に行った',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
  {
    date: '2021-01-03',
    title: '体調が良くなかった',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
  {
    date: '2021-01-04',
    title: '買い物に行った',
    user: {
      id: 'aaaa',
      name: 'tanaka',
    },
  },
];

type Card = {
  date: string;
  title: string;
  user?: {
    id: string;
    name: string;
  };
};

type RenderedItem = {
  date: string | null;
  contents?: Card;
};

const renderItem = (
  { item, index }: ListRenderItemInfo<RenderedItem>,
  props: Props
) => {
  if (item.date) {
    return <DateText date={item.date} />;
  }

  return (
    <View mb={3} mx={3} key={`${index}-contents`}>
      <Card
        title={item?.contents?.title || ''}
        categoryID={1}
        user={item?.contents?.user}
        onPress={props.onItem}
      />
    </View>
  );
};

const DateCards: React.FC<Props> = (props) => {
  const dates = Array.from(
    new Set(items.map((v) => dayjs(v.date).format('YYYY-MM-DD')))
  );

  const dateItems = dates.sort().map((date) => {
    const contents = date;

    return {
      date,
      contents,
    };
  });

  const data = dateItems
    .map((v1) => {
      const dateItem: RenderedItem = {
        date: v1.date,
      };
      const item: RenderedItem[] = items
        .filter((v2) => v2.date === v1.date)
        .map((v2) => ({
          date: null,
          contents: v2,
        }));

      return [dateItem, ...item];
    })
    .flat();

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item, props);
    },
    [props]
  );

  return (
    <View style={styles.root}>
      <FlatList<RenderedItem>
        keyExtractor={(_, index) => `search_${index}`}
        data={data}
        renderItem={renderItemCall}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default memo(DateCards);

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  footer: {
    height: 200,
  },
});
