import React from 'react';
import View from 'components/atoms/View';
import Category from './Category';
import setting from './setting';

export default {
  title: 'atoms',
};

export const _Category = () => (
  <View m={2}>
    {setting().icon.map((v) => (
      <Category key={v.id} categoryID={v.id} />
    ))}
  </View>
);
