import React, { memo } from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import * as AppleAuthentication from 'expo-apple-authentication';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';

export type Props = {
  onAppleLogin: UseFirebaseAuth['onAppleLogin'];
  onGoogleLogin: UseFirebaseAuth['onGoogleLogin'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={props.onAppleLogin}
        />
      )}
      {Platform.OS === 'android' && (
        <TouchableOpacity onPress={props.onGoogleLogin}>
          <View style={styles.googleButton}>
            <View>
              <Image
                source={require('../../../img/icon/icon_google.png')}
                width={25}
                height={25}
              />
            </View>
            <View px={2}>
              <Text fontFamily="NotoSansJP-Bold">Googleでログイン</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
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
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme().space(3),
    paddingVertical: theme().space(0),
    borderRadius: 10,
  },
});

export default memo(Page);
