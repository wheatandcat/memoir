import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { invite } from '__mockData__/Invite';
import { user } from '__mockData__/user';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  invite: invite(),
  user: {
    ...user(),
    userID: '',
  },
  loading: false,
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

describe('components/templates/Setting/AddShareUser/Page.tsx', () => {
  beforeEach(() => {
    testRenderer(<Page {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
