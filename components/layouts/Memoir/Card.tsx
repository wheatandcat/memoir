import Category from '@/components/elements/Category';
import Text from '@/components/elements/Text';
import View from '@/components/elements/View';
import UserImage from '@/components/layouts/User/Image';
import theme from 'config/theme';
import type { Item } from 'queries/api/index';
import { type FC, memo, useEffect, useState } from 'react';
import { StyleSheet, type ViewStyle, useWindowDimensions  } from 'react-native';

type User = {
  id: string;
  displayName: string;
  image: string;
};

export type Props = {
  title: Item['title'];
  categoryID: Item['categoryID'];
  user: User;
  onLoadEnd?: () => void;
};

const Card: FC<Props> = (props) => {
  const [endUserImage, setEndUserImage] = useState(false);
  const [endCategoryImage, setEndCategoryImage] = useState(false);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    if (endCategoryImage && endUserImage) {
      props.onLoadEnd?.();
    }
  }, [endCategoryImage, endUserImage, props]);

  const titleStyle: ViewStyle = {
    width: windowWidth - 130,
  };

  return (
    <View style={styles.root}>
      <View>
        <Category
          categoryID={props.categoryID}
          onLoadEnd={() => setEndCategoryImage(true)}
        />
      </View>
      <View pl={3}>
        <View style={[styles.title, titleStyle]}>
          <Text numberOfLines={2} ellipsizeMode="tail" lineHeight={25}>
            {props.title}
          </Text>
        </View>
        <View style={styles.user}>
          <UserImage
            image={props.user.image}
            size={20}
            onLoadEnd={() => setEndUserImage(true)}
          />
          <View pl={2}>
            <Text variants="small">{props.user?.displayName || '未設定'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme().space(2),
  },
  title: {},
  user: {
    paddingVertical: theme().space(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
