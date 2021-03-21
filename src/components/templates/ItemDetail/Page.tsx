import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import View from 'components/atoms/View';
import CardDetail from 'components/organisms/CardDetail/CardDetail';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import theme from 'config/theme';
import { ItemQuery, NewItem } from 'queries/api/index';
import { ConnectedType } from 'components/pages/ItemDetail/Connected';
import AddItemModal from 'components/organisms/AddItemModal';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Item = NonNullable<ItemQuery['item']>;

type Props = Pick<Item, 'categoryID' | 'title'> & {
  loading: boolean;
} & ConnectedType;

const Page: React.FC<Props> = (props) => {
  const item: NewItem = {
    title: props.title,
    categoryID: props.categoryID,
    date: props.date,
    like: false,
    dislike: false,
  };

  return (
    <>
      <AddItemModal
        item={item}
        isVisible={props.openUpdateItemModal}
        loading={false}
        date={dayjs(props.date).format('YYYY-MM-DD')}
        onAdd={props.onUpdateItem}
        onClose={props.onCloseUpdateItem}
      />
      <InputDateWrap
        date={props.date}
        onChangeDate={props.onChangeDate}
        firstItem
      >
        <ScrollView>
          <View style={styles.inner}>
            {!props.loading && (
              <CardDetail
                date={props.date}
                title={props.title}
                categoryID={props.categoryID}
                onOpenUpdateItem={props.onOpenUpdateItem}
                onDeleteItem={props.onDeleteItem}
              />
            )}
          </View>
        </ScrollView>
      </InputDateWrap>
    </>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    height: '100%',
    marginHorizontal: theme().space(3),
    marginVertical: theme().space(4),
  },
});
