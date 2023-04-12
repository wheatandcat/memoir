import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import NotFound, { Props } from '../NotFound';

const propsData = (): Props => ({ loading: false });

describe('components/molecules/RelationshipRequest/NotFound.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<NotFound {...propsData()} />)();
    expect(screen.findAllByText('申請はありません')).toBeTruthy();
  });
});
