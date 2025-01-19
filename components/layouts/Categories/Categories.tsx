import setting from "@/components/elements/Category/setting";
import View from "@/components/elements/View";
import CategoryButton from "@/components/layouts/CategoryButton";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  categoryID: number | null;
  onPress: (categoryID: number) => void;
};

const Categories: FC<Props> = (props) => {
  const category1 = setting().main[0];
  const category2 = setting().main[1];
  const category3 = setting().main[2];

  return (
    <>
      <View style={styles.root}>
        {category1.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
      <View style={styles.root}>
        {category2.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
      <View style={styles.root}>
        {category3.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
