import React, { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import View from 'components/atoms/View';
import Card from 'components/organisms/Card';
import Loading from 'components/atoms/Loading';
import DateText from 'components/molecules/Memoir/DateText';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Item = ArrayType<PlainProps['items']>;

export type Props = Pick<
  PlainProps,
  'items' | 'loading' | 'onLoadMore' | 'onItem' | 'pageInfo'
>;

type Card = Item & {
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
        categoryID={item?.contents?.categoryID || 0}
        user={item?.contents?.user}
        onPress={props.onItem}
      />
    </View>
  );
};

const ListFooterComponent = memo<{ loading: boolean }>((props) => {
  if (props.loading) {
    return (
      <View style={styles.footer}>
        <Loading size="large" />
      </View>
    );
  }

  return <View style={styles.footer} />;
});

const DateCards: React.FC<Props> = (props) => {
  const dates = Array.from(
    new Set(props.items.map((v) => dayjs(v.date).format('YYYY-MM-DD')))
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

      const item: RenderedItem[] = props.items
        .filter((v2) => dayjs(v2.date).format('YYYY-MM-DD') === v1.date)
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

  const handleLoadMore = useCallback(() => {
    if (!props.pageInfo.hasNextPage) return;
    if (props.loading) return;

    props.onLoadMore(props?.pageInfo.endCursor);
  }, [props]);

  return (
    <View style={styles.root}>
      <FlatList<RenderedItem>
        keyExtractor={(_, index) => `search_${index}`}
        data={data}
        renderItem={renderItemCall}
        ListFooterComponent={<ListFooterComponent loading={props.loading} />}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
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
    paddingTop: theme().space(2),
    height: 200,
  },
});
