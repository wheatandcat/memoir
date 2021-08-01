import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import Input from 'components/organisms/Setting/Memoir/Input';
import NotificationToggle from 'components/organisms/Setting/Memoir/Notification';
import { ConnectedType } from 'components/pages/Intro/Intro/Connected';
import Button from 'components/atoms/Button';
import dayjs from 'lib/dayjs';

export type Props = Omit<ConnectedType, 'onFinish'> & {
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
      `0000-01-01T${('00' + props.hours).slice(-2)}:${(
        '00' + props.minutes
      ).slice(-2)}:00`
    ).toDate()
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
                    notification: push ? true : false,
                  },
                  props.onNext
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
    height: '100%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: theme().color.primary.main,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    paddingVertical: theme().space(3),
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme().space(6),
    marginBottom: theme().space(3),
  },
});

export default memo(Notification);
