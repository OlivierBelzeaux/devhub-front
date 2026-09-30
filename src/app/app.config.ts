import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideApiConfiguration } from './core/api/api-configuration';
import { getRuntimeConfiguration } from './core/config/runtime-configuration';
import { DevHubTheme } from './core/theme/devhub.theme';
import { authInterceptor } from './core/auth/auth.interceptor';

const runtimeConfiguration = getRuntimeConfiguration();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      ...(runtimeConfiguration.primeUiLicenseKey ? { license: runtimeConfiguration.primeUiLicenseKey } : {}),
      theme: {
        preset: DevHubTheme,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
    provideApiConfiguration({ baseUrl: 'http://localhost:8080/api' })
  ]
};
