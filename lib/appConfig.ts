import {
  type Firestore,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";

export type AppConfig = {
  maintenance: boolean;
  maintenanceMessage: string;
  maintenancePeriod: string | null;
  supportVersion: string;
};

export const defaultAppConfig = () => ({
  maintenance: false,
  maintenanceMessage: "",
  maintenancePeriod: null,
  supportVersion: "1.0.0",
});

export const getAppConfig = async (db: Firestore): Promise<AppConfig> => {
  const ref = collection(db, "appConfig");
  const q = await query(ref, limit(1));

  const querySnapshot = await getDocs(q);

  const records: any = [];

  for (const doc of querySnapshot.docs) {
    records.push(doc.data());
  }

  if (!records || !records[0]) {
    return defaultAppConfig();
  }

  return records[0] as AppConfig;
};
