import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ProfileImage, { Props } from './ProfileImage';
import { mockFn } from 'storyBookUtils/index';

const props = (): Props => ({
  image: '',
  onChangeImage: mockFn('onChangeImage'),
});

storiesOf('organisms/UpdateProfile', module).add('ProfileImage', () => (
  <ProfileImage {...props()} />
));
