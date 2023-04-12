import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import Notification, { Props } from '../Notification';

const propsData = (): Props => ({
  count: 3,
  onPress: jest.fn(),
});

describe('components/organisms/RelationshipRequest/Notification.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<Notification {...propsData()} />)();
    expect(screen.findAllByText('招待申請が3件届いています')).toBeTruthy();
  });
});
