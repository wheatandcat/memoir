import React, { memo } from 'react';
import ListItem from 'components/molecules/ListItem';
import View from 'components/atoms/View';
import * as Linking from 'expo-linking';

type Props = {};

const items = [
  {
    name: 'Icons 8',
    url: 'https://icons8.com/',
  },
];

const LicenceList: React.FC<Props> = () => {
  return (
    <View>
      {items.map((v, index) => (
        <ListItem
          key={v.name}
          title={v.name}
          divider={index === items.length - 1}
          onPress={() => Linking.openURL(v.url)}
        />
      ))}
    </View>
  );
};

export default memo(LicenceList);
