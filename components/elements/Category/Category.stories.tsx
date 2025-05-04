import View from "@/components/elements/View";
import React from "react";
import Category from "./Category";
import setting from "./setting";

export default {
  title: "components/elements",
};

export const _Category = () => (
  <View m={2}>
    {setting().icon.map((v) => (
      <Category key={v.id} categoryID={v.id} />
    ))}
  </View>
);
