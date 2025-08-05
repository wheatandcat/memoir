import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import dayjs from "@/lib/dayjs";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

export type Props = {
  dayOfWeek: number;
  time: Date;
  onChangeDayOfWeek: (dayOfWeek: number) => void;
  onChangeTime: (time: Date) => void;
};

const dayOfWeekItems = [
  { label: "日", value: 1, key: 1 },
  { label: "月", value: 2, key: 2 },
  { label: "火", value: 3, key: 3 },
  { label: "水", value: 4, key: 4 },
  { label: "木", value: 5, key: 5 },
  { label: "金", value: 6, key: 6 },
  { label: "土", value: 7, key: 7 },
];

const Input: FC<Props> = (props) => {
  const [openTime, setOpenTime] = useState(false);
  const colorScheme = useColorScheme();

  const onChangeTime = useCallback(
    (val: Date) => {
      setOpenTime(false);
      props.onChangeTime(val);
    },
    [props],
  );

  return (
    <View pt={4}>
      <View style={styles.input}>
        <View style={styles.inputItem}>
          <RNPickerSelect
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            value={props.dayOfWeek}
            onValueChange={props.onChangeDayOfWeek}
            items={dayOfWeekItems}
            darkTheme={colorScheme === "dark"}
            style={{
              placeholder: {
                width: 40,
                height: 50,
                color: theme().color.secondary.main,
              },
              inputIOSContainer: {
                pointerEvents: "none",
              },
              inputIOS: {
                fontSize: theme().fontSizes.xl,
                fontWeight: theme().fontWeights.bold,
                width: 40,
                height: 50,
                paddingTop: theme().space(3),
              },
              inputAndroid: {
                fontSize: theme().fontSizes.xl,
                fontWeight: theme().fontWeights.bold,
                width: 50,
                height: 65,
                marginTop: theme().space(2),
                paddingTop: theme().space(1),
              },
            }}
          />
        </View>
        <View px={2} pt={4}>
          <Text>曜日の</Text>
        </View>
        <View pt={2} mt={1}>
          <TouchableOpacity>
            <Text
              fontWeight="bold"
              variants="large"
              style={styles.numberInput}
              onPress={() => setOpenTime(true)}
            >
              {dayjs(props.time).format("HH:mm")}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={openTime}
            mode="time"
            locale="ja"
            confirmTextIOS="完了"
            cancelTextIOS="キャンセル"
            is24Hour={true}
            date={props.time}
            onConfirm={onChangeTime}
            onCancel={() => setOpenTime(false)}
          />
        </View>
        <View px={2} pt={4}>
          <Text>から</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    flexDirection: "row",
  },
  inputItem: {},
  numberInput: {},
});

export default memo(Input);
