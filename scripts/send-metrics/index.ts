import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';
import { aggregateCoverages } from './coverage.js';
import { sendMetrics } from './client.js';

const aggregateMetricsAndSend = async () => {
  const coverages = await aggregateCoverages();

  const metrics = {
    coverageBranches: coverages.coverage_branches,
    coverageFunctions: coverages.coverage_functions,
    coverageLines: coverages.coverage_lines,
    coverageStatements: coverages.coverage_statements,
    date: Timestamp.fromDate(new Date(dayjs().format())),
  };

  await sendMetrics(dayjs().format('YYYY-MM-DD'), metrics);
};

const main = async () => {
  await aggregateMetricsAndSend();
};

main();
