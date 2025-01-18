import Loading from "@/components/elements/Loading";
import View from "@/components/elements/View";
import type { Props as TemplatesProps } from "@/features/setting/relationshipRequests/components/Page";
import theme from "config/theme";
import { type FC, memo, useCallback } from "react";
import { FlatList, type ListRenderItemInfo, StyleSheet } from "react-native";
import Card from "./Card";
import NotFound from "./NotFound";

export type Props = TemplatesProps;

type RenderedItem = ArrayType<Props["items"]>;

const renderItem = (
  { item, index }: ListRenderItemInfo<RenderedItem>,
  props: Props,
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

const List: FC<Props> = (props) => {
  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item, props);
    },
    [props],
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
    height: "100%",
  },
  footer: {
    paddingTop: theme().space(2),
    height: 200,
  },
});

export default memo(List);
