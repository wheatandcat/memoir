import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import Form from 'components/organisms/Login/Form';

export type Props = {
  onAppleLogin: UseFirebaseAuth['onAppleLogin'];
  onGoogleLogin: UseFirebaseAuth['onGoogleLogin'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text size="xl">🎊 Memoirへようこそ </Text>
      </View>
      <View style={styles.divider}>
        <Divider mt={2} mb={5} />
      </View>
      <Form
        onAppleLogin={props.onAppleLogin}
        onGoogleLogin={props.onGoogleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '100%',
  },
});

export default memo(Page);
