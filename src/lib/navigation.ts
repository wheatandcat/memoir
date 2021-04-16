export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    id: string;
    date: string;
  };
  Memoir: {
    startDate: string | null;
    endDate: string | null;
  };
  SettingLicence: undefined;
};
