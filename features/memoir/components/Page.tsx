import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import DateCards from "@/components/layouts/Memoir/DateCards";
import ShareButton from "@/components/layouts/Memoir/ShareButton";
import theme from "@/config/theme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type React from "react";
import { memo } from "react";
import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Props as PlainProps } from "./Plain";

export type Props = Pick<
  PlainProps,
  | "items"
  | "loading"
  | "onLoadMore"
  | "pageInfo"
  | "users"
  | "search"
  | "selectedUserIDList"
  | "onScreenShot"
  | "onChangeUserID"
> & {
  startDate: string;
  endDate: string;
};

const Page: React.FC<Props> = (props) => {
  const router = useRouter();

  const height =
    Dimensions.get("window").height - (Platform.OS === "ios" ? 122 : 104);

  return (
    <SafeAreaView
      style={styles.safe}
      edges={
        Platform.OS === "ios"
          ? ["left", "right", "bottom"]
          : ["left", "right", "top"]
      }
    >
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
      <View style={styles.close}>
        <IconButton
          name="highlight-off"
          size="base"
          onPress={() => router.back()}
        />
      </View>
      <View style={[styles.root, { height }]}>
        <View style={styles.inner}>
          <DateCards
            startDate={props.startDate}
            endDate={props.endDate}
            items={props.items}
            pageInfo={props.pageInfo}
            loading={props.loading}
            onLoadMore={props.onLoadMore}
            users={props.users}
            search={props.search}
            selectedUserIDList={props.selectedUserIDList}
            onChangeUserID={props.onChangeUserID}
          />
        </View>

        <View style={styles.action}>
          <ShareButton
            onPress={props.onScreenShot}
            disabled={props.items.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    position: "relative",
    flex: 1,
  },
  root: {
    backgroundColor: theme().color.background.main,
  },
  inner: {
    height: "100%",
  },
  action: {
    bottom: 48,
    height: 22,
  },
  close: {
    paddingLeft: theme().space(2),
    paddingTop: theme().space(3),
  },
});

export default memo(Page);
