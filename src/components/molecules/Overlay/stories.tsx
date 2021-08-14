import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Loading, { Props } from './Loading';

const props = (): Props => ({
  text: 'テスト',
});

storiesOf('molecules/Overlay', module).add('Loading', () => (
  <>
    <Loading {...props()} />
    <View m={3}>
      <Text>テスト</Text>
    </View>
  </>
));
