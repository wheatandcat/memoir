import React, { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import View from 'components/atoms/View';
import Loading from 'components/atoms/Loading';
import theme from 'config/theme';
import Card from 'components/organisms/RelationshipRequest/Card';
import NotFound from 'components/molecules/RelationshipRequest/NotFound';
import { Props as TemplatesProps } from 'components/templates/Setting/RelationshipRequests/Page';

export type Props = TemplatesProps;

type RenderedItem = ArrayType<Props['items']>;

const renderItem = (
  { item, index }: ListRenderItemInfo<RenderedItem>,
  props: Props
) => {
  return (
    <View key={`${index}-contents`}>
      <Card
        {...item}
        acceptRequesting={props.acceptRequesting}
        ngRequesting={props.ngRequesting}
        onOK={() => props.onOK(item.followerId)}
        onNG={() => props.onNG(item.followerId)}
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

const List: React.FC<Props> = (props) => {
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
        keyExtractor={(_, index) => `relationshipRequest_${index}`}
        data={props.items}
        renderItem={renderItemCall}
        ListFooterComponent={<ListFooterComponent loading={props.loading} />}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
        ListEmptyComponent={<NotFound loading={props.loading} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
  },
  footer: {
    paddingTop: theme().space(2),
    height: 200,
  },
});

export default memo(List);
