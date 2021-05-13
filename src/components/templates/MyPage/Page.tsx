import React, { memo } from 'react';
import View from 'components/atoms/View';
import { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import NotAuthenticated from 'components/organisms/MyPage/NotAuthenticated';
import Authenticated from 'components/organisms/MyPage/Authenticated';
import { User } from 'store/atoms';

export type Props = {
  user?: User;
  authenticated?: boolean;
  onUpdateProfile: () => void;
  onLogin: () => void;
  onLogout: UseFirebaseAuth['onLogout'];
};

const Page: React.FC<Props> = (props) => {
  return (
    <View>
      {props.authenticated ? (
        <Authenticated
          user={props.user as User}
          onLogout={props.onLogout}
          onUpdateProfile={props.onUpdateProfile}
        />
      ) : (
        <NotAuthenticated onLogin={props.onLogin} />
      )}
    </View>
  );
};

export default memo(Page);
