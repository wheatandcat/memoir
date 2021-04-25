import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Page, { Props } from './Page';

const props = (): Props => ({});

storiesOf('templates/Login', module).add('Page', () => <Page {...props()} />);
