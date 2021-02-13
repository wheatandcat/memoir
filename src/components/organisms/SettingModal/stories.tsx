import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import { mockFn } from 'storyBookUtils/index';
import SettingModal from './';

storiesOf('organisms', module).add('SettingModal', () => (
  <View>
    <SettingModal isVisible onClose={mockFn('onClose')} />
  </View>
));
