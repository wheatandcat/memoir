import React, { memo, useCallback, useState } from 'react';
import TemplateHome from 'components/templates/Home/Page';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useCreateItemMutation, NewItem } from 'queries/api/index';
import { Props as IndexProps } from './';

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
  openSettingModal: boolean;
  openAddItemModal: boolean;
  onAddItem: (item: NewItem) => void;
  onOpenAddItem: () => void;
  onCloseAddItem: () => void;
  onItem: () => void;
  onMemoir: () => void;
  onChangeDate: (date: string) => void;
  onCloseSettingModal: () => void;
};

const initialState = (): State => ({
  openAddItemModal: false,
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const onOpenAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: true }));
  }, []);

  const onCloseAddItem = useCallback(() => {
    setState((s) => ({ ...s, openAddItemModal: false }));
  }, []);

  const [createItemMutation, createItemMutationData] = useCreateItemMutation({
    onCompleted() {
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
    <TemplateHome
      openAddItemModal={state.openAddItemModal}
      addItemLoading={createItemMutationData.loading}
      date={dayjs().format('YYYY-MM-DD')}
      openSettingModal={props.openSettingModal}
      onAddItem={onAddItem}
      onChangeDate={onChangeDate}
      onCloseSettingModal={props.onCloseSettingModal}
      onOpenAddItem={onOpenAddItem}
      onCloseAddItem={onCloseAddItem}
      onItem={onItem}
      onMemoir={onMemoir}
    />
  );
};

export default memo(Connected);
