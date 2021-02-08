import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateInput from 'components/organisms/DateInput/DateInput';
import Cards from 'components/organisms/Cards/Cards';
import { LinearGradient } from 'expo-linear-gradient';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  onItem: () => void;
  onAddItem: () => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme().color.gradation[1], theme().color.gradation[2]]}
      style={styles.root}
    >
      <ScrollView>
        <View style={styles.inner}>
          <DateInput date="2020-01-01" />
          <Cards onItem={props.onItem} onAddItem={props.onAddItem} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Page;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  inner: {
    height: '100%',
  },
});
