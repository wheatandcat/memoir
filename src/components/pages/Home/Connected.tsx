import React, { memo, useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useCreateItemMutation, NewItem } from 'queries/api/index';
import { homeDateState, homeItemsState, Item } from 'store/atoms';
import useHomeItems from 'hooks/useHomeItems';
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
};

export type ConnectedType = {
  items: Item[];
  addItemLoading: boolean;
  date: string;
  openAddItemModal: boolean;
  openSettingModal: boolean;
  onAddItem: (item: NewItem) => void;
  onChangeDate: (date: string) => void;
  onCloseAddItem: () => void;
  onCloseSettingModal: () => void;
  onItem: (itemID: string) => void;
  onMemoir: () => void;
  onOpenAddItem: () => void;
};

const initialState = (): State => ({
  openAddItemModal: false,
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
  const [homeDate, setHomeDate] = useRecoilState(homeDateState);
  const homeItems = useRecoilValue(homeItemsState);
  const { loading, error, refetch } = useHomeItems();

  const onOpenAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: true }));
  }, []);

  const onCloseAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: false }));
  }, []);

  const [createItemMutation, createItemMutationData] = useCreateItemMutation({
    async onCompleted() {
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

  const onChangeDate = useCallback(
    (date: string) => {
      setHomeDate({
        date: dayjs(date).format('YYYY-MM-DDT00:00:00+09:00'),
      });
    },
    [setHomeDate]
  );

  const onItem = useCallback(
    (itemID: string) => {
      props.navigation.navigate('ItemDetail', {
        id: itemID,
        date: homeDate.date,
      });
    },
    [props.navigation, homeDate.date]
  );

  const onMemoir = useCallback(() => {
    props.navigation.navigate('Memoir');
  }, [props.navigation]);

  return (
    <Plain
      items={homeItems.items}
      loading={loading}
      error={error}
      addItemLoading={createItemMutationData.loading}
      date={dayjs(homeDate.date).format('YYYY-MM-DD')}
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
