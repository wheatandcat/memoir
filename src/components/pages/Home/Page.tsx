import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateInput from 'components/organisms/DateInput/DateInput';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

const Page = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <DateInput date="2020-01-01" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  root: {},
  inner: {
    height: '100%',
  },
});
