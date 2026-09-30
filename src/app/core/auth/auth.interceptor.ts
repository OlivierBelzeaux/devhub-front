import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIGURATION } from '../api/api-configuration';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const configuration = inject(API_CONFIGURATION);
  const auth = inject(AuthService);
  const token = auth.token();
  const isApiRequest = request.url.startsWith(configuration.baseUrl);
  const isLoginRequest = request.url === `${configuration.baseUrl}/auth/login`;

  if (!token || !isApiRequest || isLoginRequest) return next(request);

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
