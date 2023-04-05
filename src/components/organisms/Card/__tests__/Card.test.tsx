import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { item } from '__mockData__/item';
import { user } from '__mockData__/user';
import Card, { Props } from '../';

const propsData = (): Props => ({
  title: item().title,
  categoryID: item().categoryID,
  user: {
    id: user().id,
    name: 'name',
  },
  onPress: jest.fn(),
});

describe('components/organisms/Card/Card.tsx', () => {
  beforeEach(() => {
    testRenderer(<Card {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
