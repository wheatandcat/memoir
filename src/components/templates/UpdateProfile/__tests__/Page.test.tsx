import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  authenticated: true,
  loading: false,
  user: {
    id: 'test-id',
    userID: '',
    displayName: 'test-name',
    image: '',
  },
  onSave: jest.fn(),
});

describe('components/templates/UpdateProfile/Page.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Page {...propsData()} />)();
    expect(screen.findAllByText('表示名を入力してください')).toBeTruthy();
  });
});
