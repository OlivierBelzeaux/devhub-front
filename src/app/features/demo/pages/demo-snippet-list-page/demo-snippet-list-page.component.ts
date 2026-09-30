import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SnippetPage, SnippetQuery } from '../../../../core/models/snippet.model';
import { DemoSnippetApiService } from '../../data-access/demo-snippet-api.service';
import { ContactLinkService } from '../../../../core/contact/contact-link.service';
import { SnippetCardComponent } from '../../ui/snippet-card/snippet-card.component';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, CardModule, ErrorStateComponent, LoadingStateComponent, PaginatorModule, RouterLink, SnippetCardComponent],
  templateUrl: './demo-snippet-list-page.component.html',
  styleUrl: './demo-snippet-list-page.component.scss'
})
export class DemoSnippetListPageComponent implements OnInit {
  private readonly defaultPageSize = 20;
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly demoSnippetApi = inject(DemoSnippetApiService);
  public readonly contact = inject(ContactLinkService);
  readonly page = signal<SnippetPage | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private criteria: Pick<SnippetQuery, 'query' | 'language' | 'tag'> = {};

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.criteria = {
        query: params.get('query') || undefined,
        language: params.get('language') || undefined,
        tag: params.get('tag') || undefined
      };
      this.load(0, this.defaultPageSize);
    });
  }

  public changePage(page: number, size: number): void { this.load(page, size); }

  private load(page: number, size: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.demoSnippetApi.list({ ...this.criteria, page, size, sort: 'updatedAt,desc' }).subscribe({
      next: result => this.page.set(result),
      error: () => { this.error.set('Les snippets de démonstration sont indisponibles pour le moment.'); this.loading.set(false); },
      complete: () => this.loading.set(false)
    });
  }
}
