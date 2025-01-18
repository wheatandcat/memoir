import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";

export type Props = {
  push: number;
  setPush: (push: number) => void;
};

const options = [
  { label: "OFF", value: 0 },
  { label: "ON", value: 1 },
];

const Notification: FC<Props> = (props) => {
  return (
    <>
      <View style={styles.title}>
        <View style={styles.line} />

        <View>
          <Text>通知設定</Text>
        </View>

        <View style={styles.line} />
      </View>
      <View style={styles.push}>
        <View>
          <Text variants="small">プッシュ通知</Text>
        </View>
        <View>
          <SwitchSelector
            initial={props.push}
            options={options}
            bold
            buttonColor={theme().color.primary.main}
            backgroundColor={theme().color.base.main}
            fontSize={theme().fontSizes.base}
            textColor={theme().color.base.light}
            selectedColor={theme().color.secondary.main}
            style={styles.pushInput}
            height={43}
            onPress={(v) => props.setPush(Number(v))}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: theme().space(5),
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-around",
  },
  line: {
    width: "30%",
    backgroundColor: theme().color.base.dark,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: theme().space(3),
  },
  push: {
    marginTop: theme().space(4),
    paddingHorizontal: theme().space(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pushInput: {
    width: 139,
  },
});

export default memo(Notification);
