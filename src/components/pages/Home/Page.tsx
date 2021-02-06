import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateInput from 'components/organisms/DateInput/DateInput';
import { MaterialIcons } from '@expo/vector-icons';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

const Page = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <DateInput date="2020-01-01" />
          <TouchableOpacity>
            <View px={3} py={3}>
              <View style={styles.addButton}>
                <MaterialIcons
                  name="add"
                  size={48}
                  color={theme().color.base.dark}
                />
              </View>
            </View>
          </TouchableOpacity>
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
  addButton: {
    backgroundColor: theme().color.base.light,
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
