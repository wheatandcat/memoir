import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import CardDetail from 'components/organisms/CardDetail/CardDetail';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import theme from 'config/theme';
import { ItemQuery } from 'queries/api/index';

type Item = NonNullable<ItemQuery['item']>;

type Props = Pick<Item, 'categoryID' | 'title'> & {
  loading: boolean;
  date: string;
  onChangeDate: (date: string) => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <InputDateWrap
      date={props.date}
      onChangeDate={props.onChangeDate}
      firstItem
    >
      <ScrollView>
        <View style={styles.inner}>
          {props.loading && (
            <CardDetail
              date={props.date}
              title={props.title}
              categoryID={props.categoryID}
            />
          )}
        </View>
      </ScrollView>
    </InputDateWrap>
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
