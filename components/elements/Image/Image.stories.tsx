import View from "@/components/elements/View";
import React from "react";
import Image from "./";

export default {
  title: "atoms",
};

export const _Image = () => (
  <View>
    <Image
      source={require("../../../img/categories/category_book.png")}
      width={50}
      height={50}
    />
    <Image
      source={require("../../../img/categories/category_book.png")}
      width={100}
      height={100}
    />
    <Image
      source={require("../../../img/categories/category_book.png")}
      width={150}
      height={150}
    />
  </View>
);
