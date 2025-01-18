import Divider from "@/components/elements/Divider";
import Image from "@/components/elements/Image";
import Loading from "@/components/elements/Loading";
import View from "@/components/elements/View";
import Delayed from "@/components/layouts/Delayed/Delayed";
import DateText from "@/components/layouts/Memoir/DateText";
import Header from "@/components/layouts/Memoir/Header";
import NotFound from "@/components/layouts/Memoir/NotFound";
import Users from "@/components/layouts/Memoir/Users";
import type { Props as PlainProps } from "components/pages/Memoir/Plain";
import theme from "config/theme";
import dayjs from "lib/dayjs";
import { getModeCountMax } from "lib/utility";
import { type FC, memo, useCallback } from "react";
import {
  FlatList,
  type ListRenderItemInfo,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Card from "./Card";

type Item = ArrayType<PlainProps["items"]>;

export type Props = Pick<
  PlainProps,
  | "items"
  | "loading"
  | "search"
  | "onLoadMore"
  | "pageInfo"
  | "users"
  | "selectedUserIDList"
  | "onChangeUserID"
> & {
  startDate: string;
  endDate: string;
};

type User = {
  id: string;
  displayName: string;
  image: string;
};

type CardType = Item & {
  user: User;
};

type RenderedItem = {
  date: string | null;
  contents?: CardType;
  categoryID?: number;
  last?: boolean;
  width: number;
};

const renderItem = ({ item }: ListRenderItemInfo<RenderedItem>) => {
  if (item.date) {
    return <DateText date={item.date} categoryID={Number(item.categoryID)} />;
  }

  return (
    <View>
      <View mb={3} mx={3}>
        <Card
          title={item?.contents?.title || ""}
          categoryID={item?.contents?.categoryID || 0}
          user={item?.contents?.user as User}
        />
        {!item?.last && <Divider />}
      </View>
      {!!item?.last && (
        <Image
          source={require("@/src/img/icon/border_dotted.png")}
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

const DateCards: FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const dates = Array.from(
    new Set(props.items.map((v) => dayjs(v.date).format("YYYY-MM-DD"))),
  );

  const dateItems = dates.sort().map((date) => {
    const contents = date;

    return {
      date,
      contents,
    };
  });

  const data = dateItems.flatMap((v1) => {
    const sameDateItems = props.items.filter(
      (v2) => dayjs(v2.date).format("YYYY-MM-DD") === v1.date,
    );

    const item: RenderedItem[] = sameDateItems.map((v2, index) => {
      const user: User | undefined = props.users.find(
        (v) => v.id === v2.userID,
      );

      return {
        date: null,
        contents: {
          ...v2,
          user: user || {
            id: "",
            displayName: "",
            image: "",
          },
        },
        last: sameDateItems.length === index + 1,
        width: windowWidth,
      };
    });

    const categoryID = item.map((v) => Number(v.contents?.categoryID));

    const dateItem: RenderedItem = {
      date: v1.date,
      categoryID: getModeCountMax(categoryID),
      width: windowWidth,
    };

    return [dateItem, ...item];
  });

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item);
    },
    [],
  );

  const handleLoadMore = useCallback(() => {
    if (!props.pageInfo.hasNextPage) return;
    if (props.loading) return;

    props.onLoadMore(props?.pageInfo.endCursor);
  }, [props]);

  const isUserFilter = props.search ? false : props.users.length > 1;

  return (
    <View style={styles.root}>
      <FlatList<RenderedItem>
        keyExtractor={(_, index) => `search_${index}`}
        data={data}
        renderItem={renderItemCall}
        ListHeaderComponent={
          <View style={styles.header}>
            {isUserFilter && (
              <Users
                users={props.users}
                selectedUserIDList={props.selectedUserIDList}
                onChangeUserID={props.onChangeUserID}
              />
            )}
            <Header
              startDate={props.startDate}
              endDate={props.endDate}
              isTitle={!isUserFilter}
            />
            {props.items.length === 0 && (
              <Delayed delayCount={3}>
                <NotFound date={props.startDate} />
              </Delayed>
            )}
          </View>
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
    height: "100%",
  },
  footer: {
    paddingTop: theme().space(2),
    height: 200,
  },
  header: {
    flex: 1,
  },
});
