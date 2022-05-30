import {
  Firestore,
  collection,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';

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

export const getAppConfig = async (db: Firestore): Promise<AppConfig> => {
  const ref = collection(db, 'appConfig');
  const q = await query(ref, limit(1));

  const querySnapshot = await getDocs(q);

  const records: any = [];

  querySnapshot.forEach((doc) => {
    records.push(doc.data());
  });

  if (!records || !records[0]) {
    return defaultAppConfig();
  }

  return records[0] as AppConfig;
};
