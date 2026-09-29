import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DemoSnippetApiService } from '../../data-access/demo-snippet-api.service';

interface LanguageOption {
  label: string;
  value: string;
}

@Component({
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
  readonly languages: LanguageOption[] = [
    { label: 'Tous les langages', value: '' }, { label: 'Bash', value: 'bash' }, { label: 'CSS', value: 'css' },
    { label: 'Docker', value: 'docker' }, { label: 'HTTP', value: 'http' }, { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'javascript' }, { label: 'JSON', value: 'json' }, { label: 'SQL', value: 'sql' },
    { label: 'TypeScript', value: 'typescript' }, { label: 'YAML', value: 'yaml' }
  ];

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.filters.setValue({
        query: params.get('query') ?? '',
        language: params.get('language') ?? '',
        tag: params.get('tag')
      }, { emitEvent: false });
    });
    this.demoSnippetApi.listTags().subscribe({ next: tags => this.tags.set(tags) });
  }

  search(): void {
    const { query, language, tag } = this.filters.getRawValue();
    this.navigate(query.trim(), language, tag);
  }

  reset(): void {
    this.filters.reset({ query: '', language: '', tag: null });
    this.navigate('', '', null);
  }

  private navigate(query: string, language: string, tag: string | null): void {
    void this.router.navigate(['/demo'], {
      queryParams: { query: query || null, language: language || null, tag: tag || null }
    });
  }
}
