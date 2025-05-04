import View from "@/components/elements/View";
import React from "react";
import Loading from "./";

export default {
  title: "components/elements",
};

export const _Loading = () => (
  <View>
    <View p={3}>
      <Loading size="small" />
    </View>
    <View p={3}>
      <Loading />
    </View>
    <View p={3}>
      <Loading size="large" />
    </View>
  </View>
);

_Loading.story = {
  parameters: { loki: { skip: true } },
};
