import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import LicenceList from 'components/organisms/Setting/Licence/LicenceList';

type Props = {};

const Page: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <LicenceList />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
  },
  inner: {
    height: '100%',
    paddingBottom: theme().space(5),
  },
});

export default memo(Page);
