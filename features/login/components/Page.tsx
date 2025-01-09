import { memo, type FC } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import type { UseFirebaseAuth } from '@/src/hooks/useFirebaseAuth';
import Form from '@/src/components/organisms/Login/Form';
import Loading from '@/src/components/molecules/Overlay/Loading';

export type Props = {
  loading: boolean;
  onAppleLogin: UseFirebaseAuth['onAppleLogin'];
  onGoogleLogin: UseFirebaseAuth['onGoogleLogin'];
};

const Page: FC<Props> = (props) => {
  return (
    <>
      <View style={styles.root}>
        <View>
          <Text size="xl">🎊 Memoirへようこそ </Text>
        </View>
        <View style={styles.divider}>
          <Divider mt={2} mb={5} />
        </View>
        <Form
          onAppleLogin={props.onAppleLogin}
          onGoogleLogin={props.onGoogleLogin}
        />
      </View>
      {props.loading && <Loading text="ログイン中" />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '100%',
  },
});

export default memo(Page);
