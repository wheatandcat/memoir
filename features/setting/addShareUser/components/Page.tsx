import View from "@/components/elements/View";
import InputInvite from "@/components/layouts/AddShareUser/InputInvite";
import InputModal from "@/components/layouts/AddShareUser/InputModal";
import InviteCard from "@/components/layouts/AddShareUser/InviteCard";
import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import usePrevious from "@/hooks/usePrevious";
import theme from "config/theme";
import type React from "react";
import { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { ConnectedType, Invite } from "./type";

export type Props = ConnectedType & {
  invite: Invite;
};

const Page: React.FC<Props> = (props) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const confirmUserID = usePrevious(props.confirmUser?.id);
  const displayName = props.requestUser?.displayName ?? "";
  const [sentDisplayName, setSent] = useState<string>("");
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
          setSent("");
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
    height: "100%",
    alignItems: "center",
    marginTop: theme().space(3),
  },
  inner: {
    width: "90%",
    marginBottom: theme().space(4),
  },
});

export default memo(Page);
