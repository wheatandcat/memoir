import { useState, useCallback } from 'react';
import Page from '@/features/top/components/Connected';
import useUser from '@/hooks/useUser';

export default function SignIn() {
  const { user, onSaveWhenNotLogin } = useUser();
  const [create, setCreate] = useState(false);

  const onSkip = useCallback(() => {
    setCreate(true);
    onSaveWhenNotLogin();
  }, [onSaveWhenNotLogin]);

  return (
    <Page
      onSkip={onSkip}
      setCreate={setCreate}
      create={create}
      isExistUser={!!user.id}
    />
  );
}
