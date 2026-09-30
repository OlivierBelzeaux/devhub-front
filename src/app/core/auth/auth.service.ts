import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { API_CONFIGURATION } from '../api/api-configuration';
import { CurrentUser, LoginResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly tokenStorageKey = 'devhub.access-token';
  private readonly http = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly accessToken = signal(this.readAccessToken());
  public readonly currentUser = signal<CurrentUser | null>(null);
  public readonly isAuthenticated = computed(() => this.accessToken() !== null);

  public login(email: string, password: string): Observable<CurrentUser> {
    return this.http.post<LoginResponse>(`${this.configuration.baseUrl}/auth/login`, { email, password }).pipe(
      tap(response => this.setAccessToken(response.accessToken)),
      switchMap(() => this.fetchCurrentUser())
    );
  }

  public restoreSession(): void {
    if (!this.accessToken()) return;

    this.fetchCurrentUser().pipe(catchError(() => {
      this.logout();
      return of(null);
    })).subscribe();
  }

  public token(): string | null {
    return this.accessToken();
  }

  public logout(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    if (this.isBrowser) sessionStorage.removeItem(AuthService.tokenStorageKey);
  }

  private fetchCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.configuration.baseUrl}/auth/me`).pipe(
      tap(user => this.currentUser.set(user)),
      map(user => user)
    );
  }

  private setAccessToken(token: string): void {
    this.accessToken.set(token);
    if (this.isBrowser) sessionStorage.setItem(AuthService.tokenStorageKey, token);
  }

  private readAccessToken(): string | null {
    return this.isBrowser ? sessionStorage.getItem(AuthService.tokenStorageKey) : null;
  }
}
