import View from "@/components/elements/View";
import theme from "config/theme";
import type React from "react";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import LicenceList from "./LicenceList";

const Page: React.FC = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <LicenceList />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
  },
  inner: {
    height: "100%",
    paddingBottom: theme().space(5),
  },
});

export default memo(Page);
