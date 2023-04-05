import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Card, { Props } from '../Card';

const propsData = (): Props => ({
  title: 'title',
  categoryID: 1,
  user: {
    id: 'test',
    displayName: 'suzuki',
    image: '',
  },
});

describe('components/organisms/Memoir/Card.tsx', () => {
  beforeEach(() => {
    testRenderer(<Card {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
