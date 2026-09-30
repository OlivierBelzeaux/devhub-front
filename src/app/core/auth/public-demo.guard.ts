import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const publicDemoGuard: CanActivateFn = () => {
  if (!inject(AuthService).isAuthenticated()) return true;

  return inject(Router).createUrlTree(['/snippets']);
};
