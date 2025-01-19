import Divider from "@/components/elements/Divider";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import UserImage from "@/components/layouts/User/Image";
import theme from "@/config/theme";
import type { Props as TemplatesProps } from "@/features/setting/relationshipRequests/components/Page";
import dayjs from "@/lib/dayjs";
import type { FC } from "react";
import { memo } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

export type Props = ArrayType<TemplatesProps["items"]> & {
  acceptRequesting: boolean;
  ngRequesting: boolean;
  onOK: () => void;
  onNG: () => void;
};

const Card: FC<Props> = (props) => {
  const diffDay = dayjs().diff(props.createdAt, "days");

  return (
    <>
      <View style={styles.root}>
        <View style={styles.imageWrap}>
          <UserImage image={props.user?.image || ""} size={80} />
        </View>
        <View style={styles.user}>
          <View style={styles.nameWrap}>
            <View>
              <Text size="sm" textAlign="left">
                {props.user?.displayName || ""}
              </Text>
            </View>
            <View pr={3}>
              <Text size="sm" textAlign="left">
                {(() => {
                  if (diffDay === 0) {
                    return "今日";
                  }
                  if (diffDay > 2) {
                    return "2日以上前";
                  }
                  return `${diffDay}日前`;
                })()}
              </Text>
            </View>
          </View>
          <View my={2}>
            <Text size="sm">共有メンバー申請が届いています</Text>
          </View>
          <View style={styles.buttonWrap}>
            {props.acceptRequesting ? (
              <View style={styles.applyButton}>
                <ActivityIndicator color={theme().color.base.light} />
              </View>
            ) : (
              <TouchableOpacity onPress={props.onOK}>
                <View style={styles.applyButton}>
                  <Text size="sm">承諾する</Text>
                </View>
              </TouchableOpacity>
            )}
            {props.ngRequesting ? (
              <View style={styles.removeButton}>
                <ActivityIndicator color={theme().color.base.light} />
              </View>
            ) : (
              <TouchableOpacity onPress={props.onNG}>
                <View style={styles.removeButton}>
                  <Text size="sm">削除</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: theme().space(1),
    paddingVertical: theme().space(2),
  },
  imageWrap: {
    justifyContent: "center",
    width: "25%",
    paddingLeft: theme().space(1),
  },
  user: {
    width: "75%",
    paddingVertical: theme().space(2),
  },
  nameWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: theme().space(1),
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 215,
    paddingVertical: theme().space(2),
  },
  applyButton: {
    backgroundColor: theme().color.primary.main,
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: theme().color.base.main,
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(Card);
