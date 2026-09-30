interface RuntimeConfiguration {
  contactEmail?: string;
  primeUiLicenseKey?: string;
}

interface RuntimeWindow extends Window {
  __DEVHUB_RUNTIME_CONFIGURATION__?: RuntimeConfiguration;
}

export function getRuntimeConfiguration(): RuntimeConfiguration {
  return (window as RuntimeWindow).__DEVHUB_RUNTIME_CONFIGURATION__ ?? {};
}
