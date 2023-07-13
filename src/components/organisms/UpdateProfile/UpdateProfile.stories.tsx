import React from 'react';
import ProfileImage, { Props } from './ProfileImage';
import { mockFn } from 'storyBookUtils/index';

const props = (): Props => ({
  authenticated: true,
  image: '',
  onChangeImage: mockFn('onChangeImage'),
});

export default {
  title: 'organisms/UpdateProfile',
};

export const _ProfileImage = () => <ProfileImage {...props()} />;

_ProfileImage.story = {
  name: 'ProfileImage',
};
