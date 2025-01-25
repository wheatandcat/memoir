import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Input from "@/components/layouts/Setting/Memoir/Input";
import NotificationToggle from "@/components/layouts/Setting/Memoir/Notification";
import theme from "@/config/theme";
import type { ConnectedType } from "@/features/top/intro/components/type";
import dayjs from "@/lib/dayjs";
import { StatusBar } from "expo-status-bar";
import { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Props = Omit<ConnectedType, "onFinish"> & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
  onNext: () => void;
};

const Notification: React.FC<Props> = (props) => {
  const [dayOfWeek, setDayOfWeek] = useState(props.dayOfWeek);
  const [time, setTime] = useState(
    dayjs(
      `0000-01-01T${`${props.hours}`.padStart(
        2,
        "0",
      )}:${`${props.minutes}`.padStart(2, "0")}:00`,
    ).toDate(),
  );
  const [push, setPush] = useState(props.notification ? 1 : 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={theme().color.primary.main} style="dark" />
      <View style={styles.header}>
        <Text textAlign="center">初期設定</Text>
      </View>
      <View style={styles.root}>
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
          <NotificationToggle push={push} setPush={setPush} />
          <View p={3} style={styles.action}>
            <Button
              title="次へ"
              onPress={() =>
                props.onSaveNotification(
                  {
                    dayOfWeek,
                    hours: dayjs(time).hour(),
                    minutes: dayjs(time).minute(),
                    notification: push === 1,
                  },
                  props.onNext,
                )
              }
              width={200}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme().color.primary.main,
  },
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    alignItems: "center",
  },
  header: {
    backgroundColor: theme().color.primary.main,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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

export default memo(Notification);
