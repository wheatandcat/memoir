import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import DateCards from 'components/organisms/Memoir/DateCards';
import theme from 'config/theme';
import ShareButton from 'components/molecules/Memoir/ShareButton';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';

export type Props = Pick<
  PlainProps,
  'items' | 'loading' | 'onLoadMore' | 'onItem' | 'pageInfo'
>;

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <DateCards
          items={props.items}
          pageInfo={props.pageInfo}
          loading={props.loading}
          onItem={props.onItem}
          onLoadMore={props.onLoadMore}
        />
      </View>
      <View style={styles.action}>
        <ShareButton onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
  inner: {
    height: '93%',
  },
  action: {
    bottom: 0,
    height: '7%',
    position: 'absolute',
  },
});

export default memo(Page);
