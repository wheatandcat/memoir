import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Card, { Props } from './Card';

const props = (): Props => ({
  source: require('../../../img/common/intro_01.png'),
  text: '記録する\nふりかえる\n共有する',
  onNext: mockFn('onNext'),
});

storiesOf('molecules/Intro', module).add('Card', () => <Card {...props()} />);
