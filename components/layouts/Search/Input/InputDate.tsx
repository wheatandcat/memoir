import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import dayjs from "@/lib/dayjs";
import { type FC, memo, useState } from "react";
import { StyleSheet, TouchableOpacity, type ViewStyle } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export type Props = {
  startDate: Date;
  endDate: Date;
  error?: boolean;
  onChangeStartDate: (date: Date) => void;
  onChangeEndDate: (date: Date) => void;
};

const InputDate: FC<Props> = (props) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const dateText: ViewStyle[] = [styles.dateText];

  if (props.error) {
    dateText.push(styles.errorDateText);
  }

  return (
    <View pt={3} style={styles.inputDate}>
      <View style={dateText}>
        <TouchableOpacity onPress={() => setOpenStartDate(true)}>
          <Text variants="middle" color={props.error ? "error" : "secondary"}>
            {dayjs(props.startDate).format("YYYY.MM.DD")}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={openStartDate}
          mode="date"
          locale="ja"
          confirmTextIOS="完了"
          cancelTextIOS="キャンセル"
          is24Hour={true}
          date={props.startDate}
          onConfirm={(v) => {
            setOpenStartDate(false);
            props.onChangeStartDate(v);
          }}
          onCancel={() => setOpenStartDate(false)}
        />
      </View>
      <View mx={2}>
        <Text color={props.error ? "error" : "secondary"}>-</Text>
      </View>
      <View style={dateText}>
        <TouchableOpacity onPress={() => setOpenEndDate(true)}>
          <Text variants="middle" color={props.error ? "error" : "secondary"}>
            {dayjs(props.endDate).format("YYYY.MM.DD")}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={openEndDate}
          mode="date"
          locale="ja"
          confirmTextIOS="完了"
          cancelTextIOS="キャンセル"
          is24Hour={true}
          date={props.endDate}
          onConfirm={(v) => {
            setOpenEndDate(false);
            props.onChangeEndDate(v);
          }}
          onCancel={() => setOpenEndDate(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputDate: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dateText: {
    borderColor: theme().color.secondary.main,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  errorDateText: {
    borderColor: theme().color.error.main,
    borderBottomWidth: 1,
  },
});

export default memo(InputDate);
