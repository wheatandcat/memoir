import React, { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Modal from 'components/organisms/Modal';
import TextInput from 'components/atoms/TextInput';
import Categories from 'components/organisms/Categories';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  isVisible: boolean;
  date: string;
  onClose: () => void;
  onAdd: (state: State) => void;
};

type State = {
  title: string;
  categoryID: number | null;
};

const initialState = (): State => ({
  title: '',
  categoryID: null,
});

const AddItemModal: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const onCategory = useCallback((categoryID: number) => {
    setState((s) => ({ ...s, categoryID }));
  }, []);

  const onChangeTitle = useCallback((title: string) => {
    setState((s) => ({ ...s, title }));
  }, []);

  const valid = useCallback(() => {
    if (state.title === '') {
      return false;
    }

    if (state.categoryID === null) {
      return false;
    }

    return true;
  }, [state]);

  return (
    <Modal
      isVisible={props.isVisible}
      title={dayjs(props.date).format('YYYY.MM.DD / ddd')}
      onClose={props.onClose}
      buttonTitle="入力"
      disabledButton={!valid()}
      onPress={() => props.onAdd(state)}
    >
      <View style={styles.root} p={1} px={3}>
        <TextInput placeholder="終了したタスク" onChangeText={onChangeTitle} />
        <View py={2}>
          <Categories categoryID={state.categoryID} onPress={onCategory} />
        </View>
      </View>
    </Modal>
  );
};

export default memo(AddItemModal);

const styles = StyleSheet.create({
  root: {},
});