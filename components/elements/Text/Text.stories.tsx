import React from "react";
import { View } from "react-native";
import Text from ".";

export const Basic = () => (
  <View>
    <Text size="xl2">size:xl2</Text>
    <Text size="xl">size:xl</Text>
    <Text size="lg">size:lg</Text>
    <Text size="base">size:base</Text>
    <Text size="sm">size:sm</Text>
    <Text size="xs">size:xs</Text>
    <Text color="primary" size="lg" fontWeight="bold">
      color:primary
    </Text>
    <Text color="secondary" size="lg" fontWeight="bold">
      color:secondary
    </Text>
    <Text color="base" size="lg" fontWeight="bold">
      color:base
    </Text>
    <Text color="accent1" size="lg" fontWeight="bold">
      color:accent1
    </Text>
    <Text color="error" size="lg" fontWeight="bold">
      color:error
    </Text>
    <Text size="lg" fontWeight="bold">
      fontWeight:bold
    </Text>
    <Text size="lg" fontWeight="normal">
      fontWeight:normal
    </Text>
    <Text size="lg" fontWeight="thin">
      fontWeight:thin
    </Text>
    <Text variants="small">variants:small</Text>
    <Text variants="body">variants:body</Text>
    <Text variants="middle">variants:middle</Text>
    <Text variants="large">variants:large</Text>
    <Text variants="logo">variants:logo</Text>
    <Text>default</Text>
  </View>
);

export default {
  title: "atoms/Text",
};
