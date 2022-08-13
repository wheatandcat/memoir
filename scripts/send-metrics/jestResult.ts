import dayjs from 'dayjs';
import { $ } from 'zx';

export const getJestResult = async () => {
  let r = {
    time: 0,
    numTotalTests: 0,
  };

  try {
    await $`yarn test --json --outputFile=testResults.json`;
  } catch (err) {
    console.error(err);
  }
  try {
    const numTotalTests =
      await $`cat testResults.json | jq -r '.numTotalTests'`;

    r.numTotalTests = Number(numTotalTests);

    const testResults = await $`cat testResults.json | jq -r '.testResults'`;
    const items = JSON.parse(testResults.stdout);
    const startTime = items[0].startTime;
    const endTime = items[items.length - 1].endTime;
    const time = dayjs(endTime).diff(dayjs(startTime), 'milliseconds');

    r.time = time;
  } catch (err) {
    console.error(err);
  }

  console.log(r);

  return r;
};
