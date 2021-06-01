import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native';
import View from 'components/atoms/View';
import Loading from 'components/atoms/Loading';
import DateText from 'components/molecules/Memoir/DateText';
import dayjs from 'lib/dayjs';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';
import Header from 'components/molecules/Memoir/Header';
import theme from 'config/theme';
import { getModeCountMax } from 'lib/utility';
import Divider from 'components/atoms/Divider';
import Image from 'components/atoms/Image';
import Card from './Card';

type Item = ArrayType<PlainProps['items']>;

export type Props = Pick<
  PlainProps,
  'items' | 'loading' | 'onLoadMore' | 'onItem' | 'pageInfo'
> & {
  startDate: string;
  endDate: string;
};

type User = {
  id: string;
  name: string;
};

type Card = Item & {
  user: User;
};

type RenderedItem = {
  date: string | null;
  contents?: Card;
  categoryID?: number;
  last?: boolean;
  width: number;
};

const renderItem = (
  { item, index }: ListRenderItemInfo<RenderedItem>,
  props: Props
) => {
  if (item.date) {
    return <DateText date={item.date} categoryID={Number(item.categoryID)} />;
  }

  return (
    <View key={`${index}-contents`}>
      <View mb={3} mx={3}>
        <Card
          title={item?.contents?.title || ''}
          categoryID={item?.contents?.categoryID || 0}
          user={item?.contents?.user as User}
          onPress={props.onItem}
        />
        {!item?.last && <Divider />}
      </View>
      {!!item?.last && (
        <Image
          source={require('../../../img/icon/border_dotted.png')}
          width={item.width}
          height={2}
        />
      )}
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
  const windowWidth = useWindowDimensions().width;

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
      const user = { id: 'test', name: 'Nameless' };

      const sameDateItems = props.items.filter(
        (v2) => dayjs(v2.date).format('YYYY-MM-DD') === v1.date
      );

      const item: RenderedItem[] = sameDateItems.map((v2, index) => ({
        date: null,
        contents: {
          ...v2,
          user,
        },
        last: sameDateItems.length === index + 1,
        width: windowWidth,
      }));

      const categoryID = item.map((v) => Number(v.contents?.categoryID));

      const dateItem: RenderedItem = {
        date: v1.date,
        categoryID: getModeCountMax(categoryID),
        width: windowWidth,
      };

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
        ListHeaderComponent={
          <Header startDate={props.startDate} endDate={props.endDate} />
        }
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
