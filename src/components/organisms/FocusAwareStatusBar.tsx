import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, StatusBarProps } from 'expo-status-bar';

const FocusAwareStatusBar: React.FC<StatusBarProps> = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
