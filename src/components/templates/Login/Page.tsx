import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import * as AppleAuthentication from 'expo-apple-authentication';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';

export type Props = {
  onAppleLogin: UseFirebaseAuth['onAppleLogin'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={props.onAppleLogin}
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
  button: {
    width: 200,
    height: 44,
  },
});

export default memo(Page);
