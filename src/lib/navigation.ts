export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    id: string;
    date: string;
  };
  Memoir: {
    startDate: string;
    endDate: string;
  };
  SettingLicence: undefined;
  Login: undefined;
  MyPage: undefined;
  UpdateProfile: undefined;
  SettingAddShareUser: undefined;
  SettingRelationshipRequests: {
    onCallback: () => void;
  };
  SettingAcceptedRelationship: {
    displayName: string;
    image: string;
  };
  SettingMemoir: undefined;
  MemoirScreenShot: {
    startDate: string;
    endDate: string;
  };
};
