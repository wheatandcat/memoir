import React, { memo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { ConnectedType } from 'components/pages/Setting/Memoir/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import Input from 'components/organisms/Setting/Memoir/Input';
import Button from 'components/atoms/Button';
import dayjs from 'lib/dayjs';

export type Props = ConnectedType & {};

const Page: React.FC<Props> = (props) => {
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [time, setTime] = useState(new Date('0000-01-01T00:00:00'));
  const [push, setPush] = useState(0);

  const options = [
    { label: 'OFF', value: 0 },
    { label: 'ON', value: 1 },
  ];

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
                initial={push}
                options={options}
                bold
                buttonColor={theme().color.primary.main}
                backgroundColor={theme().color.base.main}
                fontSize={theme().fontSizes.base}
                textColor={theme().color.base.light}
                selectedColor={theme().color.secondary.main}
                style={styles.pushInput}
                height={43}
                onPress={(v) => setPush(Number(v))}
              />
            </View>
          </View>
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
    alignItems: 'center',
  },
  inner: {
    paddingVertical: theme().space(3),
  },
  title: {
    marginTop: theme().space(5),
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  line: {
    width: '30%',
    backgroundColor: theme().color.base.dark,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: theme().space(3),
  },
  pushInput: {
    width: 139,
  },
  push: {
    marginTop: theme().space(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default memo(Page);
