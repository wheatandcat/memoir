import React, { memo, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import {
  useCreateItemMutation,
  NewItem,
  useItemsByDateQuery,
} from 'queries/api/index';
import { Props as IndexProps } from './';
import Plain from './Plain';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = IndexProps & {
  openSettingModal: boolean;
  onCloseSettingModal: () => void;
};

type State = {
  openAddItemModal: boolean;
  date: string;
};

export type ConnectedType = {
  addItemLoading: boolean;
  date: string;
  openAddItemModal: boolean;
  openSettingModal: boolean;
  onAddItem: (item: NewItem) => void;
  onChangeDate: (date: string) => void;
  onCloseAddItem: () => void;
  onCloseSettingModal: () => void;
  onItem: () => void;
  onMemoir: () => void;
  onOpenAddItem: () => void;
};

const initialState = (): State => ({
  openAddItemModal: false,
  date: dayjs().format('YYYY-MM-DDT00:00:00+09:00'),
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
  const { loading, data, error, refetch } = useItemsByDateQuery({
    variables: {
      date: state.date,
    },
  });

  const onOpenAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: true }));
  }, []);

  const onCloseAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: false }));
  }, []);

  const [createItemMutation] = useCreateItemMutation({
    async onCompleted() {
      console.log('onCompleted');

      await refetch?.();

      onCloseAddItem();
    },
  });

  const onAddItem = useCallback(
    (newItem: NewItem) => {
      const variables = {
        input: newItem,
      };

      createItemMutation({ variables });
    },
    [createItemMutation]
  );

  const onChangeDate = useCallback(() => {}, []);

  const onItem = useCallback(() => {
    props.navigation.navigate('ItemDetail');
  }, [props.navigation]);

  const onMemoir = useCallback(() => {
    props.navigation.navigate('Memoir');
  }, [props.navigation]);

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      addItemLoading={false}
      date={dayjs().format('YYYY-MM-DD')}
      openAddItemModal={state.openAddItemModal}
      openSettingModal={props.openSettingModal}
      onAddItem={onAddItem}
      onChangeDate={onChangeDate}
      onCloseAddItem={onCloseAddItem}
      onCloseSettingModal={props.onCloseSettingModal}
      onItem={onItem}
      onMemoir={onMemoir}
      onOpenAddItem={onOpenAddItem}
    />
  );
};

export default memo(Connected);
