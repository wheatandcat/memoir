import React, { memo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import dayjs from 'lib/dayjs';
import { useCreateItemMutation, NewItem } from 'queries/api/index';
import { homeDateState, homeItemsState, Item, homeState } from 'store/atoms';
import useHomeItems from 'hooks/useHomeItems';
import Plain from './Plain';

export type Props = {
  openSettingModal: boolean;
  onCloseSettingModal: () => void;
};

type State = {
  openAddItemModal: boolean;
};

export type ConnectedType = {
  items: Item[];
  loading: boolean;
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

const initialState = (openAddItemModal: boolean): State => ({
  openAddItemModal,
});

const Connected: React.FC<Props> = (props) => {
  const home = useRecoilValue(homeState);
  const [state, setState] = useState<State>(
    initialState(home.openAddItemModal)
  );
  const [homeDate, setHomeDate] = useRecoilState(homeDateState);

  const homeItems = useRecoilValue(homeItemsState);
  const { loading, error, refetch } = useHomeItems();
  const navigation = useNavigation();

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
      navigation.navigate('ItemDetail', {
        id: itemID,
        date: homeDate.date,
      });
    },
    [navigation, homeDate.date]
  );

  const onMemoir = useCallback(() => {
    navigation.navigate('Memoir', {
      startDate: dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00'),
      endDate: dayjs().format('YYYY-MM-DDT00:00:00+09:00'),
    });
  }, [navigation]);

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
