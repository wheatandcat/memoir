import Category from "@/components/elements/Category";
import setting from "@/components/elements/Category/setting";
import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Menu, { type Item as MenuItem } from "@/components/layouts/Menu/Menu";
import theme from "config/theme";
import { categoryBorderStyle } from "lib/category";
import dayjs from "lib/dayjs";
import { type FC, memo, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  type ViewStyle,
  useWindowDimensions,
} from "react-native";

export type Props = {
  title: string;
  date: string;
  categoryID: number;
  like: boolean;
  dislike: boolean;
  onOpenUpdateItem: () => void;
  onDeleteItem: () => void;
};

const CardDetail: FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle = {
    width: windowWidth - 60,
  };

  const category = setting().icon.find(
    (v) => v.id === props.categoryID,
  )?.category;
  const categoryStyle: ViewStyle[] = [
    styles.root,
    categoryBorderStyle(category || 0),
  ];

  const menuItem = useCallback(
    (): MenuItem[] => [
      {
        text: "削除",
        color: "error",
        onPress: (callback?: () => void) => {
          Alert.alert(
            "削除しますか？",
            "",
            [
              {
                text: "キャンセル",
                style: "cancel",
              },
              {
                text: "削除する",
                onPress: () => {
                  props.onDeleteItem();
                  callback?.();
                },
              },
            ],
            {
              cancelable: true,
            },
          );
        },
        removeMenu: false,
      },
      {
        text: "編集",
        color: "secondary",
        testID: "edit",
        onPress: () => {
          props.onOpenUpdateItem();
        },
        removeMenu: true,
      },
    ],
    [props],
  );

  return (
    <View style={categoryStyle}>
      <View style={styles.header}>
        <View>
          <Text>{dayjs(props.date).format("YYYY.MM.DD / ddd")}</Text>
        </View>
        <Menu items={menuItem()} />
      </View>
      <View style={styles.icon}>
        <Category categoryID={props.categoryID} />
        {props.like && (
          <View px={3}>
            <Image
              source={require("@/src/img/icon/icon_like.png")}
              width={60}
              height={60}
              contentFit="contain"
              testID="like"
            />
          </View>
        )}
        {props.dislike && (
          <View px={3}>
            <Image
              source={require("@/src/img/icon/icon_dislike.png")}
              width={60}
              height={60}
              contentFit="contain"
              testID="dislike"
            />
          </View>
        )}
      </View>
      <View style={[styles.title, titleStyle]}>
        <Text lineHeight={25}>{props.title}</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

export default memo(CardDetail);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    borderLeftWidth: 5,
    paddingHorizontal: theme().space(3),
    paddingVertical: theme().space(2),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  title: {
    paddingBottom: theme().space(4),
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme().space(4),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
