import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';

export type Props = {
  onLogin: () => void;
};

const NotAuthenticated: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View m={4}>
        <Image source={require('../../../img/icon/icon_account_default.png')} />
      </View>
      <View m={3}>
        <Button title="サインイン" onPress={props.onLogin} width={220} />
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
});

export default memo(NotAuthenticated);
