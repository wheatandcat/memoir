import dayjs from 'dayjs';
import { cd } from 'zx';
import { Timestamp } from 'firebase-admin/firestore';
import { aggregateCoverages } from './coverage.js';
import { getJestResult } from './jestResult.js';
import { sendMetrics } from './client.js';

const add = -4;

const aggregateMetricsAndSend = async () => {
  cd('../../');

  const coverages = await aggregateCoverages();
  const jestResult = await getJestResult();

  const metrics = {
    coverageBranches: coverages.coverageBranches,
    coverageFunctions: coverages.coverageFunctions,
    coverageLines: coverages.coverageLines,
    coverageStatements: coverages.coverageStatements,
    numTotalTests: jestResult.numTotalTests,
    time: jestResult.time,
    date: Timestamp.fromDate(new Date(dayjs().add(add, 'days').format())),
  };

  await sendMetrics(dayjs().add(add, 'days').format('YYYY-MM-DD'), metrics);
};

const main = async () => {
  await aggregateMetricsAndSend();
};

main();
