import React, { memo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import MemoirButton from 'components/molecules/Home/MemoirButton';
import Cards from 'components/organisms/Cards/Cards';
import SettingModal from 'components/organisms/SettingModal';
import AddItemModal from 'components/organisms/AddItemModal';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  date: string;
  openSettingModal: boolean;
  onAddItem: () => void;
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

  return (
    <InputDateWrap date={props.date} onChangeDate={props.onChangeDate}>
      <>
        <SettingModal
          isVisible={props.openSettingModal}
          onClose={props.onCloseSettingModal}
        />
        <AddItemModal
          isVisible={state.openAddItemModal}
          date={dayjs().format('YYYY-MM-DD')}
          onAdd={props.onAddItem}
          onClose={() => setState((s) => ({ ...s, openAddItemModal: false }))}
        />
        <ScrollView>
          <View style={styles.inner}>
            <Cards
              onItem={props.onItem}
              onAddItem={() =>
                setState((s) => ({ ...s, openAddItemModal: true }))
              }
            />
          </View>
        </ScrollView>
        <MemoirButton onPress={props.onMemoir} />
      </>
    </InputDateWrap>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    height: '100%',
  },
});
