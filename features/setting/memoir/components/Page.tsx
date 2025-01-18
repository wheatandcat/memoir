import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Input from "@/components/layouts/Setting/Memoir/Input";
import Notification from "@/components/layouts/Setting/Memoir/Notification";
import theme from "config/theme";
import dayjs from "lib/dayjs";
import type React from "react";
import { memo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { ConnectedType } from "./type";

export type Props = ConnectedType & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Page: React.FC<Props> = (props) => {
  const [dayOfWeek, setDayOfWeek] = useState(props.dayOfWeek);
  const [time, setTime] = useState(
    dayjs(
      `0000-01-01T${`00${props.hours}`.slice(-2)}:${`00${props.minutes}`.slice(
        -2,
      )}:00`,
    ).toDate(),
  );

  const [push, setPush] = useState(props.notification ? 1 : 0);

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View>
            <View>
              <Text textAlign="center">いつ、ふりかえりますか？</Text>
            </View>
            <Input
              dayOfWeek={dayOfWeek}
              time={time}
              onChangeDayOfWeek={setDayOfWeek}
              onChangeTime={setTime}
            />
          </View>
          <Notification push={push} setPush={setPush} />
          <View p={3} style={styles.action}>
            <Button
              title="保存"
              onPress={() =>
                props.onSave({
                  dayOfWeek,
                  hours: dayjs(time).hour(),
                  minutes: dayjs(time).minute(),
                  notification: push === 1,
                })
              }
              width={200}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  inner: {
    paddingVertical: theme().space(3),
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme().space(6),
    marginBottom: theme().space(3),
  },
});

export default memo(Page);
