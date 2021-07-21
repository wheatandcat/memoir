import React, { memo } from 'react';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import TemplateTop from 'components/templates/Top/Page';

export type Props = {
  onSkip: () => void;
};

export type ConnectedType = {
  onSkip: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const { setup, onAppleLogin, onGoogleLogin } = useFirebaseAuth();

  if (!setup) {
    return null;
  }

  return (
    <TemplateTop
      onAppleLogin={onAppleLogin}
      onGoogleLogin={onGoogleLogin}
      onSkip={props.onSkip}
    />
  );
};

export default memo(Connected);
