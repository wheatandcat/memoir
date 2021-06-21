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
  user: {
    ...user(),
    userID: '',
  },
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
  onCreateRelationshipRequest: mockFn('onCreateRelationshipRequest'),
});
const tutorialModalProps = (): TutorialModalProps => ({
  isVisible: true,
  onClose: mockFn('onClose'),
  onPress: mockFn('onPress'),
});

storiesOf('organisms/AddShareUser', module)
  .add('InviteCard', () => <InviteCard {...inviteCardProps()} />)
  .add('InputInvite', () => <InputInvite {...inputInviteProps()} />)

  .add('TutorialModal', () => <TutorialModal {...tutorialModalProps()} />);

storiesOf('organisms/AddShareUser/InputModal', module)
  .add('入力画面', () => <InputModal {...inputModalProps()} />)
  .add('確認', () => (
    <InputModal
      {...inputModalProps()}
      isConfirm={true}
      confirmUser={{ displayName: 'suzuki', image: '' }}
    />
  ))
  .add('送信後', () => (
    <InputModal {...inputModalProps()} displayName="suzuki" />
  ));
