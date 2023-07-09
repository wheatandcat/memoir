import React from 'react';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Loading, { Props } from './Loading';

const props = (): Props => ({
  text: 'テスト',
});

export default {
  title: 'molecules/Overlay',
};

export const _Loading = () => (
  <>
    <Loading {...props()} />
    <View m={3}>
      <Text>テスト</Text>
    </View>
  </>
);

_Loading.story = {
  parameters: { loki: { skip: true } },
};
