import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import { mockFn } from 'storyBookUtils/index';
import Modal from './';

storiesOf('organisms', module).add(
  'Modal',
  () => (
    <View>
      <Modal
        title="タイトル"
        isVisible={true}
        onClose={mockFn('onClose')}
        loading={false}
      >
        <View pt={5}>
          <Text textAlign="center" variants="large">
            props.children
          </Text>
        </View>
      </Modal>
    </View>
  ),
  { loki: { skip: true } }
);
