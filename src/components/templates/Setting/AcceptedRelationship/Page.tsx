import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import Button from 'components/atoms/Button';
import theme from 'config/theme';
import { User } from 'store/atoms';
import UserImage from 'components/molecules/User/Image';

export type Props = {
  user: User;
  displayName: string;
  image: string;
};

const Page: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.imageWrap}>
            <View>
              <UserImage image={props.user.image || ''} size={100} />
            </View>
            <View mx={3}>
              <Text textAlign="center" size="xl2">
                ＋
              </Text>
            </View>
            <View>
              <UserImage image={props.image || ''} size={100} />
            </View>
          </View>
          <View m={4}>
            <Image
              source={require('../../../../img/icon/icon_cracker.png')}
              width={100}
              height={100}
            />
          </View>
          <View>
            <Text textAlign="center" size="lg">
              共有メンバーに{'\n'}なりました！
            </Text>
          </View>
          <View mt={5}>
            <Button
              title="一覧に戻る"
              width={200}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    paddingTop: theme().space(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(Page);
