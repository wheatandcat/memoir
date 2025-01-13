import { Stack } from 'expo-router';
import Page from '@/features/items/components';
import theme from 'config/theme';

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: theme().color.primary.main,
          },
          headerTintColor: theme().fontColors.secondary,
        }}
      />
      <Page />
    </>
  );
}
