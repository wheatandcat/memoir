import React from 'react';
import TemplateHome from 'components/templates/Home/Page.tsx';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Home: React.FC<Props> = () => {
  const onItem = () => {};
  const onAddItem = () => {};
  const onMemoir = () => {};

  return (
    <TemplateHome onItem={onItem} onAddItem={onAddItem} onMemoir={onMemoir} />
  );
};

export default Home;
