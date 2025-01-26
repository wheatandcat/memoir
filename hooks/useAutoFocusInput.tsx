import usePrevious from "@/hooks/usePrevious";
import { useFocusEffect } from "expo-router";
import { useRef } from "react";
import type { TextInput } from "react-native";

export default function useAutoFocusInput(autoFocus: boolean, time = 300) {
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
