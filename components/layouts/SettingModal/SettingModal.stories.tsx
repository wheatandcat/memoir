import React from 'react';
import View from '@/components/elements/View';
import { mockFn } from 'storyBookUtils/index';
import SettingModal from './';

export default {
  title: 'organisms',
};

export const _SettingModal = () => (
  <View>
    <SettingModal isVisible onClose={mockFn('onClose')} />
  </View>
);

_SettingModal.story = {
  name: 'SettingModal',
  parameters: { loki: { skip: true } },
};
