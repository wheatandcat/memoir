import { invite } from "__mockData__/Invite";
import { user } from "__mockData__/user";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import InputInvite from "./InputInvite";
import  type { Props as InputInviteProps } from "./InputInvite";
import InviteCard from "./InviteCard";
import  type { Props as InviteCardProps } from "./InviteCard";
import TutorialModal, {
  type Props as TutorialModalProps,
} from "./TutorialModal";

const inviteCardProps = (): InviteCardProps => ({
  loading: false,
  creating: false,
  updating: false,
  invite: invite(),
  user: {
    ...user(),
    userID: "",
  },
  onCreateInvite: mockFn("onCreateInvite"),
  onUpdateInvite: mockFn("onUpdateInvite"),
});
const inputInviteProps = (): InputInviteProps => ({
  onOpen: mockFn("onOpen"),
});
const tutorialModalProps = (): TutorialModalProps => ({
  isVisible: true,
  onClose: mockFn("onClose"),
  onPress: mockFn("onPress"),
});

export default {
  title: "organisms/AddShareUser",
};

export const _InviteCard = () => <InviteCard {...inviteCardProps()} />;

_InviteCard.story = {
  name: "InviteCard",
};

export const _InputInvite = () => <InputInvite {...inputInviteProps()} />;

_InputInvite.story = {
  name: "InputInvite",
};

export const _TutorialModal = () => <TutorialModal {...tutorialModalProps()} />;

_TutorialModal.story = {
  name: "TutorialModal",

  parameters: {
    loki: { skip: true },
  },
};
