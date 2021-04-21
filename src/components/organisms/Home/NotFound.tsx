import React from 'react';
import { StyleSheet } from 'react-native';
import NotFoundIcon from 'components/molecules/NotFound/Icon';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';

type Props = {
  date: string;
};

const NotFound: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text color="baseDark">今日のタスクは{'\n'}まだありません</Text>
      </View>
      <View mt={4}>
        <NotFoundIcon date={props.date} />
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
});
