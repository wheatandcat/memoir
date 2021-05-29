import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import theme from 'config/theme';
import UserImage from 'components/molecules/User/Image';
import { User } from 'store/atoms';
import { Invite } from 'components/pages/Setting/AddShareUser/Connected';
import TutorialModal from './TutorialModal';

export type Props = {
  user: User;
  invite: Invite;
  loading: boolean;
  onCreateInvite: () => void;
};

const InviteCard: React.FC<Props> = (props) => {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <TutorialModal
        isVisible={dialog}
        onClose={() => setDialog(false)}
        onPress={() => {
          props.onCreateInvite();
          setDialog(false);
        }}
      />
      <View style={styles.card}>
        <View style={styles.inner}>
          <View style={styles.user}>
            <UserImage image={props.user.image} size={80} />
            <View py={3}>
              <Text size="sm">{props.user.displayName}</Text>
            </View>
          </View>
          {props.invite.code === '' ? (
            <View pt={4}>
              <Button
                title="招待コードを作成する"
                loading={props.loading}
                onPress={() => setDialog(true)}
              />
            </View>
          ) : (
            <View>
              <View style={styles.invite}>
                <Text>
                  <Text size="sm" color="baseDark" textAlign="left">
                    招待コード
                  </Text>
                  {'\n'}
                  <Text size="lg" color="primary" textAlign="left">
                    {props.invite.code}
                  </Text>
                </Text>
              </View>
              <View pt={4}>
                <Button title="招待コードをコピー" onPress={() => null} />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme().color.background.light,
    alignItems: 'center',
    paddingVertical: theme().space(4),
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
  },
  inner: {
    width: 320,
  },
  user: {
    alignItems: 'center',
  },
  invite: {
    alignItems: 'center',

    paddingTop: theme().space(3),
    paddingHorizontal: theme().space(5),
  },
});

export default memo(InviteCard);
