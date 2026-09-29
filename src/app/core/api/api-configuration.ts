import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface ApiConfiguration { baseUrl: string; }
export const API_CONFIGURATION = new InjectionToken<ApiConfiguration>('API_CONFIGURATION');

export function provideApiConfiguration(configuration: ApiConfiguration): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: API_CONFIGURATION, useValue: configuration }]);
}
