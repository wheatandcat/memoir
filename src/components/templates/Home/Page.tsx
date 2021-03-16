import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import MemoirButton from 'components/molecules/Home/MemoirButton';
import Cards from 'components/organisms/Cards/Cards';
import SettingModal from 'components/organisms/SettingModal';
import AddItemModal from 'components/organisms/AddItemModal';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import { ConnectedType } from 'components/pages/Home/Connected';
import { ItemQuery } from 'queries/api/index';

type Item = ItemQuery['item'];

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  addItemLoading: boolean;
  date: string;
  items: Item[];
} & ConnectedType;

const Page: React.FC<Props> = (props) => {
  return (
    <InputDateWrap date={props.date} onChangeDate={props.onChangeDate}>
      <>
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
        <ScrollView>
          <View style={styles.inner}>
            <Cards
              loading={props.addItemLoading}
              items={props.items}
              onItem={props.onItem}
              onAddItem={props.onOpenAddItem}
            />
          </View>
        </ScrollView>
        <MemoirButton onPress={props.onMemoir} />
      </>
    </InputDateWrap>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    height: '100%',
  },
});
