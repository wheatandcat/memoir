import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccount.json');

type MetricItem = {
  coverageBranches: number;
  coverageFunctions: number;
  coverageLines: number;
  coverageStatements: number;
  date: Date;
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export const sendMetrics = async (key: string, value: MetricItem) => {
  const docRef = db.collection('app-metrics').doc(key);
  await docRef.set(value);
};
