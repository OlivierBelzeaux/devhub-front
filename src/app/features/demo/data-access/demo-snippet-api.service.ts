import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIGURATION, ApiConfiguration } from '../../../core/api/api-configuration';
import { Snippet, SnippetPage, SnippetQuery } from '../../../core/models/snippet.model';

@Injectable({ providedIn: 'root' })
export class DemoSnippetApiService {
  private readonly demoBaseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_CONFIGURATION) configuration: ApiConfiguration
  ) {
    this.demoBaseUrl = `${configuration.baseUrl}/demo`;
  }

  list(query: SnippetQuery): Observable<SnippetPage> {
    let params = new HttpParams().set('page', query.page).set('size', query.size).set('sort', query.sort);
    if (query.query) params = params.set('query', query.query);
    if (query.language) params = params.set('language', query.language);
    if (query.tag) params = params.set('tag', query.tag);
    return this.http.get<SnippetPage>(`${this.demoBaseUrl}/snippets`, { params });
  }

  findById(id: string): Observable<Snippet> {
    return this.http.get<Snippet>(`${this.demoBaseUrl}/snippets/${id}`);
  }

  listTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.demoBaseUrl}/tags`);
  }
}
