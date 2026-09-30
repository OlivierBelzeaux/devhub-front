import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIGURATION, ApiConfiguration } from '../../../core/api/api-configuration';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_CONFIGURATION) configuration: ApiConfiguration
  ) {
    this.baseUrl = `${configuration.baseUrl}/tags`;
  }

  public list(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }
}
