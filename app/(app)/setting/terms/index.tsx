import theme from "@/config/theme";
import { Stack } from "expo-router";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Terms: React.FC = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "利用規約",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerTintColor: theme().fontColors.secondary,
        }}
      />
      <WebView
        testID="terms"
        style={styles.root}
        source={{ uri: "https://memoir-app.dev/terms/app" }}
      />
    </>
  );
};

export default memo(Terms);

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
  },
});
