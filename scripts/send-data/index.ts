import { $, cd } from 'zx';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const DD_API_KEY = process.env.DD_API_KEY as string;
console.log(`DD_API_KEY: ${DD_API_KEY}`);

class DDClient {
  private apiUrl: string;

  constructor() {
    this.apiUrl = `https://api.datadoghq.com/api/v1/series?api_key=${DD_API_KEY}`;
  }

  async sendMetrics(metricsName: string, value: number) {
    const requestBody = JSON.stringify({
      series: [
        {
          metric: metricsName,
          points: [[Math.floor(Date.now() / 1000), value]],
          type: 'gauge',
        },
      ],
    });
    return await this.post(requestBody);
  }

  private async post(requestBody: string) {
    return await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
  }
}

const aggregateCoverages = async () => {
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

const aggregateMetricsAndSendDataDog = async (client: any) => {
  const [coverages] = await Promise.all([aggregateCoverages()]);

  try {
    for (const [key, value] of Object.entries<string | number>({
      ...coverages,
    })) {
      console.log(`Sending application.frontend.${key} with value ${value}`);
      await client.sendMetrics(`application.frontend.${key}`, value);
      //console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const ddClient = new DDClient();
  await aggregateMetricsAndSendDataDog(ddClient);
};

main();
