import { useRef } from 'react';
import { TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function useAutoFocusInput(
  autoFocus: boolean,
  time: number = 300
) {
  const ref = useRef<TextInput>(null);
  const timeout = useRef<number | null>(null);

  useFocusEffect(() => {
    if (autoFocus) {
      timeout.current = Number(setTimeout(() => ref.current?.focus(), time));
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  });

  return {
    ref,
    autoFocus: false,
  };
}