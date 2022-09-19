import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import dayjs from 'lib/dayjs';
import View from 'components/atoms/View';
import CardDetail from 'components/organisms/CardDetail/CardDetail';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import theme from 'config/theme';
import { ItemQuery, NewItem } from 'queries/api/index';
import { ConnectedType } from 'components/pages/ItemDetail/Connected';
import AddItemModal from 'components/organisms/AddItemModal';

type Item = NonNullable<ItemQuery['item']>;

export type Props = Pick<Item, 'categoryID' | 'title' | 'like' | 'dislike'> & {
  loading: boolean;
  itemDate: string;
} & ConnectedType;

const Page: React.FC<Props> = (props) => {
  const item: NewItem = {
    title: props.title,
    categoryID: props.categoryID,
    date: props.date,
    like: props.like,
    dislike: props.dislike,
  };

  return (
    <>
      <AddItemModal
        item={item}
        isVisible={props.openUpdateItemModal}
        loading={false}
        date={dayjs(props.date).format('YYYY-MM-DD')}
        edit
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
                date={props.itemDate}
                title={props.title}
                categoryID={props.categoryID}
                like={props.like}
                dislike={props.dislike}
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
