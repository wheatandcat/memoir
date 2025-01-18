import theme from "config/theme";
import { Stack } from "expo-router";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Privacy: React.FC = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "プライバシーポリシー",
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerTintColor: theme().fontColors.secondary,
        }}
      />
      <WebView
        testID="privacy"
        style={styles.root}
        source={{ uri: "https://memoir-app.dev/privacy/app" }}
      />
    </>
  );
};

export default memo(Privacy);

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
  },
});
