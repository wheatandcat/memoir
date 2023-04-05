import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import Plain, { Props } from '../Plain';

const propsData = (): Props => ({
  loading: false,
  error: undefined,
  data: {
    invite: invite(),
  },
  user: {
    ...user(),
    userID: '',
  },
  creating: false,
  updating: false,
  requesting: false,
  requestUser: null,
  onCreateInvite: jest.fn(),
  onUpdateInvite: jest.fn(),
  onSearchInviteCode: jest.fn(),
  onCreateRelationshipRequest: jest.fn(),
  confirmUser: null,
});

describe('components/pages/Setting/AddShareUser/Plain.tsx', () => {
  beforeEach(() => {
    testRenderer(<Plain {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
