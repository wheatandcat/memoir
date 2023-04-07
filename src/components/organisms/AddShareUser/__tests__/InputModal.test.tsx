import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import InputDialog, { Props } from '../InputModal';

const propsData = (): Props => ({
  isVisible: true,
  displayName: '',
  requesting: false,
  onClose: jest.fn(),
  onSearchInviteCode: jest.fn(),
  isConfirm: false,
  confirmUser: null,
  onCreateRelationshipRequest: jest.fn(),
});

describe('components/organisms/AddShareUser/InputModal.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<InputDialog {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
