import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateInput from 'components/organisms/DateInput/DateInput';
import MemoirButton from 'components/molecules/Home/MemoirButton.tsx';
import Cards from 'components/organisms/Cards/Cards';
import SettingModal from 'components/organisms/SettingModal';
import { LinearGradient } from 'expo-linear-gradient';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  openSettingModal: boolean;
  onItem: () => void;
  onAddItem: () => void;
  onMemoir: () => void;
  onCloseSettingModal: () => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme().color.gradation[0], theme().color.gradation[1]]}
      style={styles.root}
    >
      <SettingModal
        isVisible={props.openSettingModal}
        onClose={props.onCloseSettingModal}
      />
      <ScrollView>
        <View style={styles.inner}>
          <DateInput date="2020-01-01" />
          <Cards onItem={props.onItem} onAddItem={props.onAddItem} />
        </View>
      </ScrollView>
      <MemoirButton onPress={props.onMemoir} />
    </LinearGradient>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  inner: {
    height: '100%',
  },
});
