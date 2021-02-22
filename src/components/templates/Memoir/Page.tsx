import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import DateCards from 'components/organisms/Memoir/DateCards';
import theme from 'config/theme';
import ShareButton from 'components/molecules/Memoir/ShareButton';

type Props = {
  onItem: () => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <DateCards onItem={props.onItem} />
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
    height: '100%',
  },
  action: {
    bottom: 0,
    position: 'absolute',
  },
});

export default memo(Page);
