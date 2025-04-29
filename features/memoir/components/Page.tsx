import View from "@/components/elements/View";
import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import IconButton from "@/components/layouts/IconButton";
import DateCards from "@/components/layouts/Memoir/DateCards";
import ShareButton from "@/components/layouts/Memoir/ShareButton";
import theme from "@/config/theme";
import { iosSelector } from "@/lib/responsive";
import { useRouter } from "expo-router";
import type React from "react";
import { memo, useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
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
  const [showShareButton, setShowShareButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShareButton(true);
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={theme().color.background.main}
        style="dark"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.root}>
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
          {showShareButton && (
            <View style={styles.action}>
              <ShareButton
                onPress={props.onScreenShot}
                disabled={props.items.length === 0}
              />
            </View>
          )}
          {props.search && (
            <View style={styles.close}>
              <IconButton
                name="highlight-off"
                size="base"
                onPress={() => router.back()}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    position: "relative",
    flex: 1,
  },
  root: {
    height: "100%",
    backgroundColor: theme().color.background.main,
  },
  inner: {
    height: "100%",
  },
  action: {
    bottom: iosSelector({ iPhone8: 30, other: 0 }),
    height: Platform.OS === "ios" ? 22 : 55,
    position: "absolute",
  },
  close: {
    position: "absolute",
    top: 0,
    left: theme().space(2),
    backgroundColor: theme().color.background.main,
    borderRadius: 25,
  },
});

export default memo(Page);
