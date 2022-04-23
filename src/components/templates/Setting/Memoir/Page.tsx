import React, { memo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ConnectedType } from 'components/pages/Setting/Memoir/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import Input from 'components/organisms/Setting/Memoir/Input';
import Notification from 'components/organisms/Setting/Memoir/Notification';
import Button from 'components/atoms/Button';
import dayjs from 'lib/dayjs';

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
      `0000-01-01T${('00' + props.hours).slice(-2)}:${(
        '00' + props.minutes
      ).slice(-2)}:00`
    ).toDate()
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
                  notification: push ? true : false,
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
    height: '100%',
    width: '100%',
    alignItems: 'center',
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

export default memo(Page);
