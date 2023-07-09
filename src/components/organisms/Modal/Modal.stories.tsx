import React from 'react';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import { mockFn } from 'storyBookUtils/index';
import Modal from './';

export default {
  title: 'organisms',
};

export const _Modal = () => (
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
);

_Modal.story = {
  parameters: { loki: { skip: true } },
};
