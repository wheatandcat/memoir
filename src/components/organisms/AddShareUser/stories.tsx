import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import InviteCard, { Props as InviteCardProps } from './InviteCard';
import InputInvite, { Props as InputInviteProps } from './InputInvite';
import InputModal, { Props as InputModalProps } from './InputModal';
import TutorialModal, { Props as TutorialModalProps } from './TutorialModal';

const inviteCardProps = (): InviteCardProps => ({
  loading: false,
  creating: false,
  updating: false,
  invite: invite(),
  user: user(),
  onCreateInvite: mockFn('onCreateInvite'),
  onUpdateInvite: mockFn('onUpdateInvite'),
});
const inputInviteProps = (): InputInviteProps => ({
  onOpen: mockFn('onOpen'),
});
const inputModalProps = (): InputModalProps => ({
  isVisible: true,
  displayName: '',
  requesting: false,
  onClose: mockFn('onClose'),
  onSearchInviteCode: mockFn('onSearchInviteCode'),
});
const tutorialModalProps = (): TutorialModalProps => ({
  isVisible: true,
  onClose: mockFn('onClose'),
  onPress: mockFn('onPress'),
});

storiesOf('organisms/AddShareUser', module)
  .add('InviteCard', () => <InviteCard {...inviteCardProps()} />)
  .add('InputInvite', () => <InputInvite {...inputInviteProps()} />)
  .add('InputDialog', () => <InputModal {...inputModalProps()} />)
  .add('TutorialModal', () => <TutorialModal {...tutorialModalProps()} />);
