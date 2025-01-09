import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Page from '@/features/top/components/Page';
import { useSession } from '../ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <Page loading={false} onAppleLogin={() => {}} onGoogleLogin={() => {}} />
  );

  /**
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}
      >
        Sign In2
      </Text>
    </View>
  */
}
