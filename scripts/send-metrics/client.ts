import { createRequire } from "module";
import { cert, initializeApp } from "firebase-admin/app";
import { type Timestamp, getFirestore } from "firebase-admin/firestore";
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccount.json");

type MetricItem = {
  coverageBranches: number;
  coverageFunctions: number;
  coverageLines: number;
  coverageStatements: number;
  date: Timestamp;
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export const sendMetrics = async (key: string, value: MetricItem) => {
  const docRef = db.collection("app-metrics").doc(key);
  await docRef.set(value);
};
