import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import NotFoundIcon from 'components/molecules/NotFound/Icon';
import View from '@/components/elements/View';
import Text from '@/components/elements/Text';

type Props = {
  date: string;
};

const NotFound: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text color="baseDark" textAlign="center">
          期間中のタスクは{'\n'}まだありません
        </Text>
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
