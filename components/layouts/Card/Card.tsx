import Category from "@/components/elements/Category";
import setting from "@/components/elements/Category/setting";
import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { categoryBorderStyle } from "@/lib/category";
import type { Item } from "queries/api/index";
import type { FC } from "react";
import { memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
  useWindowDimensions,
} from "react-native";

type User = {
  id: string;
  name: string;
};

export type Props = {
  title: Item["title"];
  categoryID: Item["categoryID"];
  user?: User;
  onPress: () => void;
};

const Card: FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle: ViewStyle = {
    width: windowWidth - 120,
  };
  if (props.user) {
    titleStyle.height = 60;
    titleStyle.justifyContent = "flex-end";
  }

  const rootStyle = { height: 75 };
  if (props.user) {
    rootStyle.height = 95;
  }

  const category = setting().icon.find(
    (v) => v.id === props.categoryID,
  )?.category;
  const categoryStyle: ViewStyle[] = [
    rootStyle,
    styles.root,
    categoryBorderStyle(category || 0),
  ];

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={categoryStyle}>
        <View mx={2}>
          <Category categoryID={props.categoryID} />
        </View>
        <View>
          <View style={[styles.title, titleStyle]}>
            <Text numberOfLines={2} ellipsizeMode="tail" lineHeight={25}>
              {props.title}
            </Text>
          </View>
          {!!props.user?.id && (
            <View style={styles.user}>
              <Image
                source={require("@/assets/img/icon/account.png")}
                width={20}
                height={20}
              />
              <View pl={2}>
                <Text variants="small">{props.user?.name}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 5,
  },
  title: {
    paddingLeft: theme().space(0),
  },
  user: {
    paddingVertical: theme().space(2),
    flexDirection: "row",
    alignItems: "center",
  },
});
