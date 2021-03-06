import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { ConnectedType } from 'components/pages/Setting/RelationshipRequests/Connected';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { Props as PlainProps } from 'components/pages/Setting/RelationshipRequests/Plain';
import List from 'components/organisms/RelationshipRequest/List';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';

export type Props = ConnectedType &
  Pick<
    PlainProps,
    | 'items'
    | 'loading'
    | 'onLoadMore'
    | 'pageInfo'
    | 'acceptRequesting'
    | 'ngRequesting'
  >;

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="light"
      />
      <List {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    width: '100%',
  },
});

export default memo(Page);
