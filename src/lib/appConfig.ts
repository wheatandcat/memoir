import firebase from 'lib/system/firebase';

export type AppConfig = {
  maintenance: boolean;
  maintenanceMessage: string;
  maintenancePeriod: string | null;
  supportVersion: string;
};

export const defaultAppConfig = () => ({
  maintenance: false,
  maintenanceMessage: '',
  maintenancePeriod: null,
  supportVersion: '1.0.0',
});

export const getAppConfig = async (
  db: firebase.firestore.Firestore
): Promise<AppConfig> => {
  console.log('getAppConfig');

  const qs = await db.collection('appConfig').limit(1).get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  if (!records || !records[0]) {
    return defaultAppConfig();
  }

  return records[0] as AppConfig;
};
