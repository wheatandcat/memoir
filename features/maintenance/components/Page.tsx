import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { AppConfig } from "@/lib/appConfig";
import type React from "react";
import { memo, useEffect } from "react";
import { StyleSheet } from "react-native";

export type Props = AppConfig & {
  getMaintenance: () => void;
};

const Page: React.FC<Props> = (props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      props.getMaintenance();
    }, 30000);

    return () => clearInterval(interval);
  }, [props]);

  return (
    <View style={styles.root}>
      <View py={5}>
        <Text textAlign="center">ただいまメンテンナンス中です。</Text>
      </View>

      {!!props.maintenancePeriod && (
        <View px={3}>
          <Text textAlign="center" color="secondaryLight" lineHeight={36}>
            【メンテンナンス日程】
          </Text>

          <Text textAlign="center" color="error">
            {props.maintenancePeriod}
          </Text>
        </View>
      )}

      <View px={3} pt={4}>
        <Text variants="small" color="secondaryLight">
          {props.maintenanceMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    alignItems: "center",
  },
});

export default memo(Page);
