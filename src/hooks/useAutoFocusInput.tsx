import { useRef } from 'react';
import { TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import usePrevious from 'hooks/usePrevious';

export default function useAutoFocusInput(
  autoFocus: boolean,
  time: number = 300
) {
  const ref = useRef<TextInput>(null);
  const timeout = useRef<number | null>(null);
  const prevAutoFocus = usePrevious(autoFocus);

  useFocusEffect(() => {
    if (autoFocus && !prevAutoFocus) {
      timeout.current = Number(setTimeout(() => ref.current?.focus(), time));
    }
  });

  return {
    ref,
    autoFocus: false,
  };
}
