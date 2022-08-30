import React, { memo, useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Modal from 'components/organisms/Modal';
import TextInput from 'components/atoms/TextInput';
import Categories from 'components/organisms/Categories';
import Compatibility from 'components/organisms/Compatibility/Compatibility';
import dayjs from 'lib/dayjs';
import { NewItem } from 'queries/api/index';
import usePrevious from 'hooks/usePrevious';
import theme from 'config/theme';

export type Props = {
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
  like: boolean;
  dislike: boolean;
};

const initialState = (item?: NewItem): State => {
  return {
    title: item?.title || '',
    categoryID: item?.categoryID || null,
    like: item?.like || false,
    dislike: item?.dislike || false,
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
      date: dayjs(props.date).format('YYYY-MM-DDT00:00:00+09:00'),
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
      testID="add_item_modal"
    >
      <View style={styles.root} py={2} px={3}>
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
