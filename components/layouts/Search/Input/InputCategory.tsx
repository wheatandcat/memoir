import setting from "@/components/elements/Category/setting";
import View from "@/components/elements/View";
import CategoryButton from "@/components/layouts/CategoryButton";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  categoryID: number;
  onPress: (categoryID: number) => void;
};

const InputCategory: FC<Props> = (props) => {
  const category1 = setting().main[0];
  const category2 = setting().main[1];
  const category3 = setting().main[2];

  return (
    <>
      <View style={styles.category}>
        {category1.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity={!(props.categoryID === v)}
              onPress={() => props.onPress(v)}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category2.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity={!(props.categoryID === v)}
              onPress={() => props.onPress(v)}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category3.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity={!(props.categoryID === v)}
              onPress={() => props.onPress(v)}
              displayName={false}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default memo(InputCategory);
