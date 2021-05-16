import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Image, { Props } from './Image';

const props = (): Props => ({ image: null });

storiesOf('molecules/User', module).add('Image', () => <Image {...props()} />);
