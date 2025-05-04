import View from "@/components/elements/View";
import React from "react";
import Image from "./";

export default {
  title: "components/elements",
};

export const _Image = () => (
  <View>
    <Image
      source={require("@/assets/img/categories/category_book.png")}
      width={50}
      height={50}
    />
    <Image
      source={require("@/assets/img/categories/category_book.png")}
      width={100}
      height={100}
    />
    <Image
      source={require("@/assets/img/categories/category_book.png")}
      width={150}
      height={150}
    />
  </View>
);
