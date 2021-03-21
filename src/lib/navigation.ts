export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    id: string;
    date: string;
    onChangeDate: (date: string) => void;
  };
  Memoir: undefined;
  SettingLicence: undefined;
};
