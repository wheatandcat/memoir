import { $ } from 'zx';

export const aggregateCoverages = async () => {
  let r = {
    coverageBranches: 0,
    coverageFunctions: 0,
    coverageLines: 0,
    coverageStatements: 0,
  };

  try {
    await $`yarn test --collectCoverage=true --coverageReporters=json-summary`;
  } catch (err) {
    console.error(err);
  }
  try {
    const result =
      await $`cat coverage/coverage-summary.json | jq -r '.total | keys[] as $k | {("coverage_" + $k):(.[$k].pct)}' | jq -s add`;

    const coverages = JSON.parse(result.stdout);

    r.coverageBranches = coverages.coverage_branches;
    r.coverageFunctions = coverages.coverage_functions;
    r.coverageLines = coverages.coverage_lines;
    r.coverageStatements = coverages.coverage_statements;
  } catch (err) {
    console.error(err);
  }

  return r;
};
