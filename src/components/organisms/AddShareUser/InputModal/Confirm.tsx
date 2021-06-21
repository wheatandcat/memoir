import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import UserImage from 'components/molecules/User/Image';
import theme from 'config/theme';
import Button from 'components/atoms/Button';

export type Props = {
  displayName: string;
  image: string;
  requesting: boolean;
  onOK: () => void;
  onNG: () => void;
};

const Confirm: React.FC<Props> = (props) => {
  return (
    <View style={styles.invite}>
      <View style={styles.imageWrap}>
        <UserImage image={props.image || ''} size={50} />
      </View>
      <Text textAlign="center">
        <Text color="primary">{props.displayName}</Text> さんに共有の申請を
        {'\n'}送りますか？
      </Text>
      <View style={styles.action}>
        <View mx={2}>
          <Button
            size="sm"
            title="送信する"
            onPress={props.onOK}
            width={120}
            disabled={props.requesting}
            loading={props.requesting}
          />
        </View>
        <View mx={2}>
          <TouchableOpacity onPress={props.onNG}>
            <View style={styles.removeButton}>
              <Text size="sm">キャンセル</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    justifyContent: 'center',
    marginBottom: theme().space(3),
  },
  invite: {
    alignItems: 'center',
    paddingTop: theme().space(3),
    paddingBottom: theme().space(2),
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: theme().space(4),
  },
  removeButton: {
    backgroundColor: theme().color.base.main,
    borderRadius: 7,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Confirm);
