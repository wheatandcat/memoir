import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import NotAuthenticated from 'components/organisms/MyPage/NotAuthenticated';
import Authenticated from 'components/organisms/MyPage/Authenticated';
import { User } from 'store/atoms';
import theme from 'config/theme';

export type Props = {
  user?: User;
  authenticated?: boolean;
  relationshipRequestCount: number;
  onUpdateProfile: () => void;
  onLogin: () => void;
  onLogout: UseFirebaseAuth['onLogout'];
  onAddShareUser: () => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <ScrollView>
      <View style={styles.root}>
        {props.authenticated ? (
          <Authenticated
            user={props.user as User}
            relationshipRequestCount={props.relationshipRequestCount}
            onLogout={props.onLogout}
            onUpdateProfile={props.onUpdateProfile}
            onAddShareUser={props.onAddShareUser}
          />
        ) : (
          <NotAuthenticated onLogin={props.onLogin} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    width: '100%',
  },
});

export default memo(Page);
