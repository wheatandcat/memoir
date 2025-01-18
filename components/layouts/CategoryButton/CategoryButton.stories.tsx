import setting from "@/components/elements/Category/setting";
import View from "@/components/elements/View";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { mockFn } from "storyBookUtils/index";
import CategoryButton from "./CategoryButton";

export default {
  title: "molecules",
};

export const _CategoryButton = () => (
  <ScrollView>
    <View style={styles.root}>
      {setting().icon.map((v) => (
        <View m={2} key={v.id}>
          <CategoryButton categoryID={v.id} onPress={mockFn("onPress")} />
        </View>
      ))}
    </View>
  </ScrollView>
);

_CategoryButton.story = {
  name: "CategoryButton",
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
