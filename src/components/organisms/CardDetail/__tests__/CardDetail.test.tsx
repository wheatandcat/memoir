import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import { item } from '__mockData__/item';
import CardDetail, { Props } from '../CardDetail';

const propsData = (): Props => ({
  title: item().title,
  date: item().date,
  categoryID: item().categoryID,
  like: item().like,
  dislike: item().dislike,
  onOpenUpdateItem: jest.fn(),
  onDeleteItem: jest.fn(),
});

describe('components/organisms/CardDetail/CardDetail.tsx', () => {
  beforeEach(() => {
    testRenderer(<CardDetail {...propsData()} />)();
  });

  it('正常にrenderすること', () => {
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
