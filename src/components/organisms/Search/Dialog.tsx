import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import UserImage from 'components/molecules/User/Image';
import theme from 'config/theme';
import { User } from 'store/atoms';
import setting from 'components/atoms/Category/setting';
import CategoryButton from 'components/molecules/CategoryButton';
import Compatibility from 'components/organisms/Compatibility/Compatibility';
import Button from 'components/atoms/Button';

export type Props = {
  users: Omit<User, 'userID'>[];
};

const Dialog: React.FC<Props> = (props) => {
  const category1 = setting().main[0];
  const category2 = setting().main[1];
  const category3 = setting().main[2];

  return (
    <View style={styles.root}>
      <View pt={3}>
        <Text variants="small" color="secondaryLight">
          日付
        </Text>
      </View>
      <View pt={3} style={styles.inputDate}>
        <View style={styles.dateText}>
          <Text variants="middle">2021.12.01</Text>
        </View>
        <View mx={2}>
          <Text>-</Text>
        </View>
        <View style={styles.dateText}>
          <Text variants="middle">2021.12.31</Text>
        </View>
      </View>
      <View pt={4} pb={2}>
        <View pb={3}>
          <Text variants="small" textAlign="center" color="secondaryLight">
            共有メンバー
          </Text>
        </View>

        <View style={styles.users}>
          {props.users.map((v) => (
            <View px={3}>
              <UserImage image={v.image} size={50} />
            </View>
          ))}
        </View>
      </View>
      <View py={2} style={styles.divider}>
        <Divider />
      </View>
      <View py={1}>
        <Text
          variants="small"
          textAlign="center"
          lineHeight={20}
          color="secondaryLight"
        >
          カテゴリー{'\n'}※1つのみ選択可能
        </Text>
      </View>
      <View style={styles.category}>
        {category1.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category2.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category3.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View py={2} style={styles.divider}>
        <Divider />
      </View>
      <View pt={2} pb={2}>
        <View>
          <Text variants="small" textAlign="center" color="secondaryLight">
            Good / Bad
          </Text>
        </View>
        <View py={2}>
          <Compatibility
            like={false}
            dislike={false}
            size={64}
            opacity
            onLike={() => null}
            onDislike={() => null}
          />
        </View>
      </View>
      <View mx={3} mt={4} style={styles.action}>
        <Button title="検索" size="lg" onPress={() => null} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  inputDate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    borderColor: theme().color.secondary.main,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  users: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  divider: {
    width: '80%',
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  action: {
    width: '80%',
  },
});

export default memo(Dialog);
