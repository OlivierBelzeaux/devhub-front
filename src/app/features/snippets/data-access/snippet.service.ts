import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIGURATION, ApiConfiguration } from '../../../core/api/api-configuration';
import { Snippet, SnippetPage, SnippetQuery, SnippetRequest } from '../../../core/models/snippet.model';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_CONFIGURATION) configuration: ApiConfiguration
  ) {
    this.baseUrl = `${configuration.baseUrl}/snippets`;
  }

  public list(query: SnippetQuery): Observable<SnippetPage> {
    let params = new HttpParams().set('page', query.page).set('size', query.size).set('sort', query.sort);
    if (query.query) params = params.set('query', query.query);
    if (query.language) params = params.set('language', query.language);
    if (query.tag) params = params.set('tag', query.tag);
    return this.http.get<SnippetPage>(this.baseUrl, { params });
  }

  public findById(id: string): Observable<Snippet> {
    return this.http.get<Snippet>(`${this.baseUrl}/${id}`);
  }

  public create(request: SnippetRequest): Observable<Snippet> {
    return this.http.post<Snippet>(this.baseUrl, request);
  }

  public update(id: string, request: SnippetRequest): Observable<Snippet> {
    return this.http.put<Snippet>(`${this.baseUrl}/${id}`, request);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
