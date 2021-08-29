import { AppConfig } from 'lib/appConfig';

export const appConfig = (option?: Partial<AppConfig>): AppConfig => ({
  maintenance: false,
  maintenanceMessage: '',
  maintenancePeriod: null,
  supportVersion: '1.0.0',
  ...option,
});
