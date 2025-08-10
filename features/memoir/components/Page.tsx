import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import DateCards from "@/components/layouts/Memoir/DateCards";
import ShareButton from "@/components/layouts/Memoir/ShareButton";
import theme from "@/config/theme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type React from "react";
import { memo, useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();

  const bottom = insets.bottom;

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
      <Bottom disabled={props.items.length === 0} />
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

        <View style={[styles.action, { bottom: 58 - bottom / 2 }]}>
          <ShareButton
            onPress={props.onScreenShot}
            disabled={props.items.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

type BottomProps = {
  disabled: boolean;
};

const Bottom: React.FC<BottomProps> = (props) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 100);
  }, []);

  if (!display) {
    return null;
  }

  return (
    <View
      style={[
        styles.bottom,
        props.disabled ? styles.bottomColorDisabled : styles.bottomColor,
      ]}
    />
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
    bottom: 55,
    backgroundColor: theme().color.primary.main,
  },
  close: {
    paddingLeft: theme().space(2),
    paddingTop: theme().space(3),
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: theme().color.primary.main,
  },
  bottomColor: {
    backgroundColor: theme().color.primary.main,
  },
  bottomColorDisabled: {
    backgroundColor: theme().color.base.dark,
  },
});

export default memo(Page);
