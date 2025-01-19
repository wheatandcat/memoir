import Category from "@/components/elements/Category";
import { icon } from "@/components/elements/Category/setting";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { categoryBorderStyle } from "@/lib/category";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback, type ViewStyle } from "react-native";

type Props = {
  categoryID: number;
  selected?: boolean;
  displayName?: boolean;
  opacity?: boolean;
  onPress: () => void;
};

const CategoryButton: FC<Props> = ({
  displayName = true,
  opacity = false,
  ...props
}) => {
  const style: ViewStyle[] = [styles.image];
  if (props.selected) {
    style.push(styles.selected);
  }

  if (opacity && !props.selected) {
    style.push(styles.opacity);
  }

  const s = icon(props.categoryID);

  const categoryStyle: ViewStyle[] = [
    styles.category,
    categoryBorderStyle(s.category || 0),
  ];

  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      testID={`input_category_id_${props.categoryID}`}
    >
      <View>
        <View style={style}>
          <Category categoryID={props.categoryID} />
        </View>
        {displayName && (
          <View style={categoryStyle}>
            <Text variants="small">{s.name}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CategoryButton);

const styles = StyleSheet.create({
  category: {
    borderLeftWidth: 8,
    paddingVertical: theme().space(0),
    paddingLeft: theme().space(2),
    marginVertical: theme().space(1),
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: theme().color.primary.light,
    borderRadius: 40,
  },
  opacity: {
    opacity: 0.3,
  },
});
