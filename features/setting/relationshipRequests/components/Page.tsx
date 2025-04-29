import View from "@/components/elements/View";
import List from "@/components/layouts/RelationshipRequest/List";
import theme from "@/config/theme";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";
import type { Props as PlainProps } from "./Plain";
import type { ConnectedType } from "./type";

export type Props = ConnectedType &
  Pick<
    PlainProps,
    | "items"
    | "loading"
    | "onLoadMore"
    | "pageInfo"
    | "acceptRequesting"
    | "ngRequesting"
  >;

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <List {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    width: "100%",
  },
});

export default memo(Page);
