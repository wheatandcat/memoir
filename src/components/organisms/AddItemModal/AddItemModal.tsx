import React, { memo, useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Modal from 'components/organisms/Modal';
import TextInput from 'components/atoms/TextInput';
import Categories from 'components/organisms/Categories';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { NewItem } from 'queries/api/index';
import usePrevious from 'hooks/usePrevious';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  item?: NewItem;
  isVisible: boolean;
  loading: boolean;
  date: string;
  onClose: () => void;
  onAdd: (newItem: NewItem) => void;
};

type State = {
  title: string;
  categoryID: number | null;
};

const initialState = (item?: NewItem): State => {
  return {
    title: item?.title || '',
    categoryID: item?.categoryID || null,
  };
};

const AddItemModal: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.item));
  const prevIsVisible = usePrevious(props.isVisible);

  useEffect(() => {
    if (props.isVisible && props.isVisible !== prevIsVisible) {
      setState(initialState(props.item));
    }
  }, [props.isVisible, props.item, prevIsVisible]);

  const onCategory = useCallback((categoryID: number) => {
    setState((s) => ({ ...s, categoryID }));
  }, []);

  const onChangeTitle = useCallback((title: string) => {
    setState((s) => ({ ...s, title }));
  }, []);

  const onAdd = useCallback(() => {
    const item: NewItem = {
      title: state.title,
      categoryID: state.categoryID || 0,
      date: dayjs(props.date).format('YYYY-MM-DDT00:00:00+09:00'),
      like: false,
      dislike: false,
    };

    props.onAdd(item);
  }, [props, state]);

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
      disabledButton={!valid() && !props.loading}
      onPress={onAdd}
      loading={props.loading}
    >
      <View style={styles.root} p={1} px={3}>
        <TextInput
          placeholder="終了したタスク"
          onChangeText={onChangeTitle}
          autoFocus
          returnKeyType="done"
          defaultValue={state.title}
        />

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
