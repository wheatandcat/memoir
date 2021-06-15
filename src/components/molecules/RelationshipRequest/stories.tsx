import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NotFound, { Props } from './NotFound';

const props = (): Props => ({ loading: false });

storiesOf('molecules/RelationshipRequest', module).add('NotFound', () => (
  <NotFound {...props()} />
));
