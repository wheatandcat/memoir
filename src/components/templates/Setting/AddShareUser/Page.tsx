import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ConnectedType } from 'components/pages/Setting/AddShareUser/Connected';
import View from 'components/atoms/View';
import theme from 'config/theme';
import InviteCard from 'components/organisms/AddShareUser/InviteCard';
import InputInvite from 'components/organisms/AddShareUser/InputInvite';
import InputModal from 'components/organisms/AddShareUser/InputModal';
import { Invite } from 'components/pages/Setting/AddShareUser/Connected';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import usePrevious from 'hooks/usePrevious';

export type Props = ConnectedType & {
  invite: Invite;
};

const Page: React.FC<Props> = (props) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const confirmUserID = usePrevious(props.confirmUser?.id);
  const displayName = props.requestUser?.displayName ?? '';
  const [sentDisplayName, setSent] = useState<string>('');
  const preDisplayName = usePrevious(displayName);

  useEffect(() => {
    if (props.confirmUser?.id !== confirmUserID) {
      if (props.confirmUser?.id) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    }
  }, [props.confirmUser?.id, confirmUserID]);

  useEffect(() => {
    if (displayName !== preDisplayName) {
      setSent(displayName);
    }
  }, [displayName, preDisplayName]);

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="light"
      />
      <InputModal
        isVisible={dialog}
        onClose={() => {
          setDialog(false);
          setConfirm(false);
          setSent('');
        }}
        onSearchInviteCode={props.onSearchInviteCode}
        displayName={sentDisplayName}
        requesting={props.requesting}
        isConfirm={isConfirm}
        confirmUser={props.confirmUser}
        onCreateRelationshipRequest={props.onCreateRelationshipRequest}
      />
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.inner}>
            <InviteCard
              invite={props.invite}
              user={props.user}
              loading={props.loading}
              creating={props.creating}
              updating={props.updating}
              onCreateInvite={props.onCreateInvite}
              onUpdateInvite={props.onUpdateInvite}
            />
          </View>
          <View style={styles.inner}>
            <InputInvite onOpen={() => setDialog(true)} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
    marginTop: theme().space(3),
  },
  inner: {
    width: '90%',
    marginBottom: theme().space(4),
  },
});

export default memo(Page);
