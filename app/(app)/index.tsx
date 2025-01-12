import { Text, View } from 'react-native';
import Home from '@/features/home/components/Connected';
import { useSession } from '@/ctx';

export default function Index() {
  const { signOut } = useSession();
  return <Home />;
}
