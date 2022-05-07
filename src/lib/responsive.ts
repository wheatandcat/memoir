import { Dimensions, PixelRatio } from 'react-native';

const DEVICES = {
  iPhoneSe: { width: 640 },
  iPhone8: { width: 750 },
};

const fetchDeviceWidth = () =>
  Dimensions.get('window').width * PixelRatio.get();

export const devices = ['iPhoneSE', 'iPhone8', 'other'] as const;

export type IosSelectorProps = {
  [k in typeof devices[number]]?: any;
};
export type IosSelectors = keyof IosSelectorProps;

const iosSelector = ({ iPhoneSE, iPhone8, other }: IosSelectorProps) => {
  if (iPhoneSE && DEVICES.iPhoneSe.width >= fetchDeviceWidth()) return iPhoneSE;
  if (iPhone8 && DEVICES.iPhone8.width >= fetchDeviceWidth()) return iPhone8;

  return other;
};

export { iosSelector };
