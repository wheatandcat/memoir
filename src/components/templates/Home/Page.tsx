import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import MemoirButton from 'components/molecules/Home/MemoirButton';
import Cards from 'components/organisms/Cards/Cards';
import SettingModal from 'components/organisms/SettingModal';
import AddItemModal from 'components/organisms/AddItemModal';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import { ConnectedType } from 'components/pages/Home/Connected';
import GestureRecognizerWrap from 'components/organisms/Home/GestureRecognizerWrap';
import { ItemQuery } from 'queries/api/index';
import theme from 'config/theme';

type Item = ItemQuery['item'];

dayjs.locale('ja');
dayjs.extend(advancedFormat);

export type Props = {
  addItemLoading: boolean;
  date: string;
  items: Item[];
} & ConnectedType;

const Page: React.FC<Props> = (props) => {
  const style: ViewStyle[] = [];
  if (props.items.length > 3) {
    style.push(styles.inner);
  }

  return (
    <InputDateWrap date={props.date} onChangeDate={props.onChangeDate}>
      <SettingModal
        isVisible={props.openSettingModal}
        onClose={props.onCloseSettingModal}
      />
      <AddItemModal
        isVisible={props.openAddItemModal}
        loading={props.addItemLoading}
        date={dayjs(props.date).format('YYYY-MM-DD')}
        onAdd={props.onAddItem}
        onClose={props.onCloseAddItem}
      />

      <GestureRecognizerWrap
        date={props.date}
        items={props.items}
        onChangeDate={props.onChangeDate}
      >
        <Cards
          date={props.date}
          addItemLoading={props.addItemLoading}
          loading={props.loading}
          items={props.items}
          onItem={props.onItem}
          onAddItem={props.onOpenAddItem}
        />
      </GestureRecognizerWrap>

      <MemoirButton onPress={props.onMemoir} />
    </InputDateWrap>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    marginBottom: theme().space(3),
  },
});
