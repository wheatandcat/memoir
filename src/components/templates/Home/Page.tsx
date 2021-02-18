import React, { memo, useState, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateInput from 'components/organisms/DateInput/DateInput';
import MemoirButton from 'components/molecules/Home/MemoirButton.tsx';
import Cards from 'components/organisms/Cards/Cards';
import SettingModal from 'components/organisms/SettingModal';
import AddItemModal from 'components/organisms/AddItemModal';
import { LinearGradient } from 'expo-linear-gradient';
import theme from 'config/theme';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  date: string;
  openSettingModal: boolean;
  onItem: () => void;
  onMemoir: () => void;
  onCloseSettingModal: () => void;
  onChangeDate: (date: string) => void;
};

type State = {
  openAddItemModal: boolean;
};

const initialState = (): State => ({
  openAddItemModal: false,
});

const Page: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const onAddItem = useCallback(() => {}, []);

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
      <AddItemModal
        isVisible={state.openAddItemModal}
        date={dayjs().format('YYYY-MM-DD')}
        onAdd={onAddItem}
        onClose={() => setState((s) => ({ ...s, openAddItemModal: false }))}
      />
      <ScrollView>
        <View style={styles.inner}>
          <DateInput date={props.date} onChange={props.onChangeDate} />
          <Cards
            onItem={props.onItem}
            onAddItem={() =>
              setState((s) => ({ ...s, openAddItemModal: true }))
            }
          />
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
