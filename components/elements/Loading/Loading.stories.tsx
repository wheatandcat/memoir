import React from 'react';
import View from 'components/atoms/View';
import Loading from './';

export default {
  title: 'atoms',
};

export const _Loading = () => (
  <View>
    <View p={3}>
      <Loading size="small" />
    </View>
    <View p={3}>
      <Loading />
    </View>
    <View p={3}>
      <Loading size="large" />
    </View>
  </View>
);

_Loading.story = {
  parameters: { loki: { skip: true } },
};
