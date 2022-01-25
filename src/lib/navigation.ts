export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    id: string;
    date: string;
  };
  Memoir: {
    startDate: string;
    endDate: string;
    userIDList?: string[];
    categoryID?: number;
    like?: boolean;
    dislike?: boolean;
    search?: boolean;
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
    selectedUserIDList: string[];
    categoryID: number;
    like: boolean;
    dislike: boolean;
  };
  Search: undefined;
};
