import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Card from 'components/organisms/Card';
import AddButton from 'components/molecules/Home/AddButton';
import { ItemQuery } from 'queries/api/index';
import NotFound from 'components/organisms/Home/NotFound';
import theme from 'config/theme';

type Item = ItemQuery['item'];

export type Props = {
  date: string;
  addItemLoading: boolean;
  loading: boolean;
  items: Item[];
  onItem: (itemID: string) => void;
  onAddItem: () => void;
};

const Cards: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <AddButton onPress={props.onAddItem} />

      {props.addItemLoading && (
        <View style={styles.loading} mb={3} mx={3}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View>
        {(props.items || []).map((v) => (
          <View key={v?.id} mb={3} mx={3}>
            <Card
              title={v?.title || ''}
              categoryID={v?.categoryID || 0}
              onPress={() => props.onItem(v?.id || '')}
            />
          </View>
        ))}
        {!props.loading && props.items.length === 0 && (
          <NotFound date={props.date} />
        )}
      </View>
    </View>
  );
};

export default memo(Cards);

const styles = StyleSheet.create({
  root: {},
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    backgroundColor: theme().color.background.light,
  },
});
