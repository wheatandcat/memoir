import { $, cd } from 'zx';

export const aggregateCoverages = async () => {
  cd('../../');

  try {
    await $`yarn test --collectCoverage=true --coverageReporters=json-summary`;
  } catch (err) {
    console.error(err);
  }
  try {
    const result =
      await $`cat coverage/coverage-summary.json | jq -r '.total | keys[] as $k | {("coverage_" + $k):(.[$k].pct)}' | jq -s add`;

    return JSON.parse(result.stdout);
  } catch (err) {
    console.error(err);
  }
};
