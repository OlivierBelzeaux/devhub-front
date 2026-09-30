import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideApiConfiguration } from '../api/api-configuration';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let auth: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideApiConfiguration({ baseUrl: 'http://localhost:8080/api' }),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });
    auth = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('stores the token and loads the connected user after login', () => {
    let receivedEmail: string | undefined;
    auth.login('olivier@example.test', 'secret').subscribe(user => receivedEmail = user.email);

    const loginRequest = http.expectOne('http://localhost:8080/api/auth/login');
    expect(loginRequest.request.headers.has('Authorization')).toBe(false);
    expect(loginRequest.request.body).toEqual({ email: 'olivier@example.test', password: 'secret' });
    loginRequest.flush({ accessToken: 'jwt-token', expiresAt: '2026-10-01T00:00:00Z' });

    const currentUserRequest = http.expectOne('http://localhost:8080/api/auth/me');
    expect(currentUserRequest.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    currentUserRequest.flush({ id: 'f7fdc54b-8113-45d8-9956-e56083f59d8c', email: 'olivier@example.test', role: 'USER' });

    expect(receivedEmail).toBe('olivier@example.test');
    expect(auth.currentUser()?.email).toBe('olivier@example.test');
    expect(sessionStorage.getItem('devhub.access-token')).toBe('jwt-token');
  });

  it('clears the session on logout', () => {
    auth.logout();

    expect(auth.isAuthenticated()).toBe(false);
    expect(auth.currentUser()).toBeNull();
    expect(sessionStorage.getItem('devhub.access-token')).toBeNull();
  });
});
