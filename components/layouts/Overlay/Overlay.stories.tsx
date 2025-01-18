import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import React from "react";
import Loading, { type Props } from "./Loading";

const props = (): Props => ({
  text: "テスト",
});

export default {
  title: "molecules/Overlay",
};

export const _Loading = () => (
  <>
    <Loading {...props()} />
    <View m={3}>
      <Text>テスト</Text>
    </View>
  </>
);

_Loading.story = {
  parameters: { loki: { skip: true } },
};
