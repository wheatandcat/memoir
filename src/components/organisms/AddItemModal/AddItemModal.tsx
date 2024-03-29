import React, { memo, useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import Modal from 'components/organisms/Modal';
import TextInput from 'components/atoms/TextInput';
import Categories from 'components/organisms/Categories';
import Compatibility from 'components/organisms/Compatibility/Compatibility';
import Text from 'components/atoms/Text';
import dayjs from 'lib/dayjs';
import { NewItem } from 'queries/api/index';
import usePrevious from 'hooks/usePrevious';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import theme from 'config/theme';

export type Props = {
  item?: NewItem;
  isVisible: boolean;
  loading: boolean;
  date: string;
  edit?: boolean;
  onClose: () => void;
  onAdd: (newItem: NewItem) => void;
};

type State = {
  title: string;
  categoryID: number | null;
  date: Date;
  like: boolean;
  dislike: boolean;
};

const initialState = (date: string, item?: NewItem): State => {
  return {
    title: item?.title || '',
    categoryID: item?.categoryID || null,
    date: new Date(date),
    like: item?.like || false,
    dislike: item?.dislike || false,
  };
};

const AddItemModal: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(
    initialState(props.date, props.item)
  );
  const prevIsVisible = usePrevious(props.isVisible);
  const [openDate, setOpenDate] = useState(false);

  useEffect(() => {
    if (props.isVisible && props.isVisible !== prevIsVisible) {
      setState(initialState(props.date, props.item));
    }
  }, [props.isVisible, props.item, props.date, prevIsVisible]);

  const onCategory = useCallback((categoryID: number) => {
    setState((s) => ({ ...s, categoryID }));
  }, []);

  const onChangeTitle = useCallback((title: string) => {
    setState((s) => ({ ...s, title }));
  }, []);

  const onChangeDate = useCallback((date: Date) => {
    setState((s) => ({ ...s, date }));
  }, []);

  const onLike = useCallback(() => {
    setState((s) => ({
      ...s,
      like: !s.like,
      dislike: !s.like ? false : s.dislike,
    }));
  }, []);

  const onDislike = useCallback(() => {
    setState((s) => ({
      ...s,
      dislike: !s.dislike,
      like: !s.dislike ? false : s.like,
    }));
  }, []);

  const onAdd = useCallback(() => {
    const item: NewItem = {
      title: state.title,
      categoryID: state.categoryID || 0,
      date: dayjs(state.date).format('YYYY-MM-DDT00:00:00+09:00'),
      like: state.like,
      dislike: state.dislike,
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
  }, [state.title, state.categoryID]);

  return (
    <Modal
      isVisible={props.isVisible}
      title={dayjs(props.date).format('YYYY.MM.DD / ddd')}
      titleElement={
        props.edit ? (
          <TouchableOpacity onPress={() => setOpenDate(!openDate)}>
            <View>
              <Text variants="middle" textAlign="center">
                {dayjs(state.date).format('YYYY.MM.DD / ddd')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : undefined
      }
      onClose={props.onClose}
      buttonTitle="入力"
      disabledButton={!valid() && !props.loading}
      onPress={onAdd}
      loading={props.loading}
      testID="add_item_modal"
    >
      <View style={styles.root} py={2} px={3}>
        <DateTimePickerModal
          isVisible={openDate && !!props.edit}
          mode="date"
          locale="ja"
          confirmTextIOS="完了"
          cancelTextIOS="キャンセル"
          is24Hour={true}
          date={state.date}
          onConfirm={(v) => {
            setOpenDate(false);
            onChangeDate(v);
          }}
          onCancel={() => setOpenDate(false)}
          onResponderEnd={() => setOpenDate(false)}
        />
        <TextInput
          placeholder="今日何やった？"
          onChangeText={onChangeTitle}
          autoFocus
          returnKeyType="done"
          defaultValue={state.title}
          style={state.title ? styles.input : styles.placeholder}
        />

        <View py={3}>
          <Categories categoryID={state.categoryID} onPress={onCategory} />
        </View>
        <View py={3}>
          <Compatibility
            like={state.like}
            dislike={state.dislike}
            onLike={onLike}
            onDislike={onDislike}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(AddItemModal);

AddItemModal.defaultProps = {
  edit: false,
};

const styles = StyleSheet.create({
  root: {},
  placeholder: {
    height: 60,
    fontSize: theme().fontSizes.xl,
  },
  input: {
    height: 60,
    fontSize: theme().fontSizes.lg,
  },
});
