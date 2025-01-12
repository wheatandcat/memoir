import  { memo, type FC } from 'react';
import ListItem from '@/components/layouts/ListItem';
import View from '@/components/elements/View';
import licenses from '@/src/licenses.json';
import * as Linking from 'expo-linking';

const items = [
  {
    name: 'Icons 8',
    url: 'https://icons8.com/',
  },
];

const LicenceList: FC = () => {
  const licenseKeys = Object.keys(licenses);

  const licenseItems = licenseKeys
    .map((key) => {
      const v = licenses as any;

      return {
        name: key,
        url: v?.[key]?.licenseUrl || '',
      };
    })
    .filter((v) => {
      if (!v.url || !v.name) {
        return false;
      }

      if (
        v.name.includes('@expo') ||
        v.name.includes('expo-') ||
        v.name.includes('@types') ||
        v.name.includes('graphql-') ||
        v.name.includes('@react-native-community') ||
        v.name.includes('react-dom') ||
        v.name.includes('@react-navigation/stack') ||
        v.name.includes('react-native-screens') ||
        v.name.includes('react-native-safe-area-context')
      ) {
        return false;
      }

      return true;
    })
    .map((v) => {
      if (
        v.name === 'recoil' ||
        v.name === 'react-native' ||
        v.name === '@react-navigation/native' ||
        v.name === 'react-native-gesture-handler' ||
        v.name === 'graphql' ||
        v.name === 'react' ||
        v.name === 'uuid'
      ) {
        v.url = v.url.replace('master', 'main');
      } else if (v.name === 'react-native-snap-carousel') {
        v.url =
          'https://github.com/archriss/react-native-snap-carousel/raw/master/LICENSE';
      } else if (v.name === 'expo') {
        v.url = 'https://github.com/expo/expo/raw/main/LICENSE';
      } else if (v.name === 'firebase') {
        v.url =
          'https://raw.githubusercontent.com/firebase/firebase-js-sdk/master/LICENSE';
      }

      return v;
    });

  return (
    <View>
      {[...items, ...licenseItems].map((v, index) => (
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
