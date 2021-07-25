import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import Form from 'components/organisms/Login/Form';

export type Props = {
  onAppleLogin: UseFirebaseAuth['onAppleLogin'];
  onGoogleLogin: UseFirebaseAuth['onGoogleLogin'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
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
    alignItems: 'center',
    padding: theme().space(4),
  },
});

export default memo(Page);
