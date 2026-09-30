import { writeFileSync } from 'node:fs';

const runtimeConfiguration = {
  apiBaseUrl: process.env.API_BASE_URL,
  contactEmail: process.env.CONTACT_EMAIL,
  primeUiLicenseKey: process.env.PRIMEUI_LICENSE_KEY,
};

writeFileSync(
  'public/runtime-config.js',
  `window.__DEVHUB_RUNTIME_CONFIGURATION__ = ${JSON.stringify(runtimeConfiguration)};\n`,
);
