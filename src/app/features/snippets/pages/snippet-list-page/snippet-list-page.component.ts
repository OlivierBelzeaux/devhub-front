import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SnippetPage, SnippetQuery } from '../../../../core/models/snippet.model';
import { SnippetCardComponent } from '../../../demo/ui/snippet-card/snippet-card.component';
import { SnippetService } from '../../data-access/snippet.service';
import { TagService } from '../../data-access/tag.service';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';
import { LANGUAGE_FILTER_OPTIONS, LanguageOption } from '../../../../shared/data/language-options';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    CardModule,
    ErrorStateComponent,
    InputTextModule,
    LoadingStateComponent,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    SelectModule,
    SnippetCardComponent
  ],
  templateUrl: './snippet-list-page.component.html',
  styleUrl: './snippet-list-page.component.scss'
})
export class SnippetListPageComponent implements OnInit {
  private readonly defaultPageSize = 20;
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snippetService = inject(SnippetService);
  private readonly tagService = inject(TagService);
  private criteria: Pick<SnippetQuery, 'query' | 'language' | 'tag'> = {};

  public readonly filters = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    language: new FormControl('', { nonNullable: true }),
    tag: new FormControl<string | null>(null)
  });
  public readonly page = signal<SnippetPage | null>(null);
  public readonly tags = signal<string[]>([]);
  public readonly loading = signal(false);
  public readonly error = signal<string | null>(null);
  public readonly languages: LanguageOption[] = LANGUAGE_FILTER_OPTIONS;

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.criteria = {
        query: params.get('query') || undefined,
        language: params.get('language') || undefined,
        tag: params.get('tag') || undefined
      };
      this.filters.setValue({
        query: this.criteria.query ?? '',
        language: this.criteria.language ?? '',
        tag: this.criteria.tag ?? null
      }, { emitEvent: false });
      this.load(0, this.defaultPageSize);
    });
    this.tagService.list().subscribe({ next: tags => this.tags.set(tags) });
  }

  public search(): void {
    const { query, language, tag } = this.filters.getRawValue();
    void this.router.navigate(['/snippets'], {
      queryParams: { query: query.trim() || null, language: language || null, tag: tag || null }
    });
  }

  public reset(): void {
    this.filters.reset({ query: '', language: '', tag: null });
    void this.router.navigate(['/snippets']);
  }

  public changePage(page: number, size: number): void {
    this.load(page, size);
  }

  private load(page: number, size: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.snippetService.list({ ...this.criteria, page, size, sort: 'updatedAt,desc' }).subscribe({
      next: result => this.page.set(result),
      error: () => {
        this.error.set('Vos snippets sont indisponibles pour le moment.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
