import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DemoSnippetApiService } from '../../data-access/demo-snippet-api.service';
import { LANGUAGE_FILTER_OPTIONS, LanguageOption } from '../../../../shared/data/language-options';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-search-bar',
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, SelectModule],
  templateUrl: './demo-search-bar.component.html',
  styleUrl: './demo-search-bar.component.scss'
})
export class DemoSearchBarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly demoSnippetApi = inject(DemoSnippetApiService);

  readonly filters = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    language: new FormControl('', { nonNullable: true }),
    tag: new FormControl<string | null>(null)
  });
  readonly tags = signal<string[]>([]);
  readonly languages: LanguageOption[] = LANGUAGE_FILTER_OPTIONS;

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.filters.setValue({
        query: params.get('query') ?? '',
        language: params.get('language') ?? '',
        tag: params.get('tag')
      }, { emitEvent: false });
    });
    this.demoSnippetApi.listTags().subscribe({ next: tags => this.tags.set(tags) });
  }

  public search(): void {
    const { query, language, tag } = this.filters.getRawValue();
    this.navigate(query.trim(), language, tag);
  }

  public reset(): void {
    this.filters.reset({ query: '', language: '', tag: null });
    this.navigate('', '', null);
  }

  private navigate(query: string, language: string, tag: string | null): void {
    void this.router.navigate(['/demo'], {
      queryParams: { query: query || null, language: language || null, tag: tag || null }
    });
  }
}
