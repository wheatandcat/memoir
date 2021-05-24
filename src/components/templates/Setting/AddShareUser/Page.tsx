import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { ConnectedType } from 'components/pages/Setting/AddShareUser/Connected';
import View from 'components/atoms/View';
import theme from 'config/theme';
import InviteCard from 'components/organisms/AddShareUser/InviteCard';

export type Props = ConnectedType & {};

const Page: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <InviteCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
  },
  inner: {
    width: '90%',
  },
});

export default memo(Page);
