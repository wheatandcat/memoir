import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ConnectedType } from 'components/pages/Setting/AddShareUser/Connected';
import View from 'components/atoms/View';
import theme from 'config/theme';
import InviteCard from 'components/organisms/AddShareUser/InviteCard';
import InputInvite from 'components/organisms/AddShareUser/InputInvite';
import InputModal from 'components/organisms/AddShareUser/InputModal';
import { Invite } from 'components/pages/Setting/AddShareUser/Connected';

export type Props = ConnectedType & {
  invite: Invite;
};

const Page: React.FC<Props> = (props) => {
  const [dialog, setDialog] = useState<boolean>(false);

  console.log(props.invite);

  return (
    <>
      <InputModal isVisible={dialog} onClose={() => setDialog(false)} />
      <View style={styles.root}>
        <View style={styles.inner}>
          <InviteCard />
        </View>
        <View style={styles.inner}>
          <InputInvite onOpen={() => setDialog(true)} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
  },
  inner: {
    width: '90%',
    marginBottom: theme().space(4),
  },
});

export default memo(Page);
