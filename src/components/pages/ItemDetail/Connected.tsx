import React, { memo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import {
  useItemQuery,
  useUpdateItemMutation,
  UpdateItem,
  NewItem,
} from 'queries/api/index';
import Plain from './Plain';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  itemID: string;
  date: string;
  onChangeDate: (date: string) => void;
};

type State = {
  openUpdateItemModal: boolean;
};

export type ConnectedType = {
  updateItemLoading: boolean;
  date: string;
  openUpdateItemModal: boolean;
  onOpenUpdateItem: () => void;
  onChangeDate: (date: string) => void;
  onUpdateItem: (updateItem: NewItem) => void;
  onCloseUpdateItem: () => void;
};

const initialState = (): State => ({
  openUpdateItemModal: false,
});

const Connected: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const [state, setState] = useState<State>(initialState());

  const { loading, data, error, refetch } = useItemQuery({
    variables: {
      id: props.itemID,
    },
  });

  const onOpenUpdateItem = useCallback(() => {
    setState((s) => ({ ...s, openUpdateItemModal: true }));
  }, []);

  const onCloseUpdateItem = useCallback(() => {
    setState((s) => ({ ...s, openUpdateItemModal: false }));
  }, []);

  const [updateItemMutation] = useUpdateItemMutation({
    async onCompleted() {
      await refetch?.();

      onCloseUpdateItem();
    },
  });

  const onUpdateItem = useCallback(
    (newItem: NewItem) => {
      const updateItem: UpdateItem = {
        id: props.itemID,
        ...newItem,
      };

      const variables = {
        input: updateItem,
      };

      updateItemMutation({ variables });
    },
    [updateItemMutation, props.itemID]
  );

  const onChangeDate = useCallback(
    (date: string) => {
      const formatDate = dayjs(props.date).format('YYYY-MM-DD');
      if (formatDate !== date) {
        props.onChangeDate(date);
        navigation.goBack();
      }
    },
    [props, navigation]
  );

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      updateItemLoading={false}
      date={dayjs(props.date).format('YYYY-MM-DD')}
      openUpdateItemModal={state.openUpdateItemModal}
      onChangeDate={onChangeDate}
      onOpenUpdateItem={onOpenUpdateItem}
      onUpdateItem={onUpdateItem}
      onCloseUpdateItem={onCloseUpdateItem}
    />
  );
};

export default memo(Connected);
