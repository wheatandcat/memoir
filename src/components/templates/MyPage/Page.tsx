import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import Image from 'components/atoms/Image';

export type Props = {
  authenticated?: boolean;
  onLogin: () => void;
  onLogout: UseFirebaseAuth['onLogout'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View m={4}>
        <Image source={require('../../../img/icon/icon_account_default.png')} />
      </View>
      {props.authenticated ? (
        <View m={3}>
          <TouchableOpacity onPress={props.onLogout}>
            <Text>ログアウト</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View m={3}>
          <Button title="サインイン" onPress={props.onLogin} width={220} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
  },
});

export default memo(Page);
