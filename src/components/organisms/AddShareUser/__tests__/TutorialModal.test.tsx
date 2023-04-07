import React from 'react';
import { testRenderer } from 'lib/testUtil';
import { screen } from '@testing-library/react-native';
import TutorialModal, { Props } from '../TutorialModal';

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
  onPress: jest.fn(),
});

describe('components/organisms/AddShareUser/TutorialModal.tsx', () => {
  it('正常にrenderすること', () => {
    testRenderer(<TutorialModal {...propsData()} />)();
    expect(screen.findAllByText('')).toBeTruthy();
  });
});
