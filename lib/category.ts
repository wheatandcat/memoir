import theme from "@/config/theme";
import master from "@/lib/master";
import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

export const categoryBorderStyle = (category: number): ViewStyle => {
  switch (category) {
    case master.CATEGORY_1:
      return styles.category1;
    case master.CATEGORY_2:
      return styles.category2;
    case master.CATEGORY_3:
      return styles.category3;
  }

  return styles.nonCategory;
};

const styles = StyleSheet.create({
  nonCategory: {
    borderLeftColor: theme().color.background.main,
  },
  category1: {
    borderLeftColor: theme().category.color.category1,
  },
  category2: {
    borderLeftColor: theme().category.color.category4,
  },
  category3: {
    borderLeftColor: theme().category.color.category2,
  },
});
