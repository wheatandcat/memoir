import firebase from 'lib/system/firebase';

export type AppConfig = {
  maintenance: boolean;
  maintenanceMessage: string;
  maintenancePeriod: string | null;
};

export const defaultAppConfig = () => ({
  maintenance: false,
  maintenanceMessage: '',
  maintenancePeriod: null,
});

export const getAppConfig = async (
  db: firebase.firestore.Firestore
): Promise<AppConfig> => {
  const qs = await db.collection('appConfig').limit(1).get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  if (!records || !records[0]) {
    return defaultAppConfig();
  }

  return records[0] as AppConfig;
};
