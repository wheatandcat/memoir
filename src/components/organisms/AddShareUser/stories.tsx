import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import InviteCard, { Props as InviteCardProps } from './InviteCard';
import InputInvite, { Props as InputInviteProps } from './InputInvite';
import InputModal, { Props as InputModalProps } from './InputModal';

const inviteCardProps = (): InviteCardProps => ({});
const inputInviteProps = (): InputInviteProps => ({
  onOpen: mockFn('onOpen'),
});
const inputModalProps = (): InputModalProps => ({
  isVisible: true,
  onClose: mockFn('onClose'),
});

storiesOf('organisms/AddShareUser', module)
  .add('InviteCard', () => <InviteCard {...inviteCardProps()} />)
  .add('InputInvite', () => <InputInvite {...inputInviteProps()} />)
  .add('InputDialog', () => <InputModal {...inputModalProps()} />);
