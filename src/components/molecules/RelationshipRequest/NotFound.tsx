import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import theme from 'config/theme';
import { useNavigation } from '@react-navigation/native';

export type Props = {
  loading: boolean;
};

const NotFound: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  if (props.loading) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View p={3}>
        <Text textAlign="center">申請はありません</Text>
      </View>
      <View p={3}>
        <Button
          title="戻る"
          onPress={() => {
            navigation.goBack();
          }}
          width={200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: 320,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(NotFound);
