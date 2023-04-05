import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { user } from '__mockData__/user';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  user: {
    ...user(),
    userID: '',
  },
  displayName: 'suzuki',
  image: '',
});

describe('components/templates/Setting/AcceptedRelationship/Page.tsx', () => {
  beforeEach(() => {
    testRenderer(<Page {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
