import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { SnippetRequest } from '../../../../core/models/snippet.model';
import { SnippetService } from '../../data-access/snippet.service';
import { TagService } from '../../data-access/tag.service';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';
import { LanguageOption, SNIPPET_LANGUAGE_OPTIONS } from '../../../../shared/data/language-options';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    ErrorStateComponent,
    InputTextModule,
    LoadingStateComponent,
    ReactiveFormsModule,
    RouterLink,
    SelectModule,
    TextareaModule
  ],
  templateUrl: './snippet-form-page.component.html',
  styleUrl: './snippet-form-page.component.scss'
})
export class SnippetFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snippetService = inject(SnippetService);
  private readonly tagService = inject(TagService);
  private readonly snippetId = this.route.snapshot.paramMap.get('id');

  public readonly mode = this.route.snapshot.data['mode'] as 'create' | 'edit';
  public readonly loading = signal(this.mode === 'edit');
  public readonly saving = signal(false);
  public readonly error = signal<string | null>(null);
  public readonly knownTags = signal<string[]>([]);
  public readonly filteredTags = signal<string[]>([]);
  public readonly languages: LanguageOption[] = SNIPPET_LANGUAGE_OPTIONS;
  public readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] }),
    language: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(1_000)] }),
    content: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tags: new FormControl<string[]>([], { nonNullable: true })
  });

  public ngOnInit(): void {
    this.tagService.list().subscribe({ next: tags => this.knownTags.set(tags) });
    if (this.mode !== 'edit') return;
    if (!this.snippetId) {
      this.error.set('Identifiant de snippet manquant.');
      this.loading.set(false);
      return;
    }

    this.snippetService.findById(this.snippetId).subscribe({
      next: snippet => this.form.setValue({
        title: snippet.title,
        language: snippet.language,
        description: snippet.description ?? '',
        content: snippet.content,
        tags: snippet.tags
      }),
      error: () => {
        this.error.set('Ce snippet est introuvable ou indisponible.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }

  public submit(): void {
    if (this.form.invalid || this.tags().length > 20) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.request();
    this.saving.set(true);
    this.error.set(null);
    const operation = this.mode === 'edit' && this.snippetId
      ? this.snippetService.update(this.snippetId, request)
      : this.snippetService.create(request);

    operation.subscribe({
      next: () => void this.router.navigate(['/snippets']),
      error: () => {
        this.error.set('La sauvegarde du snippet a échoué. Vérifiez les champs et réessayez.');
        this.saving.set(false);
      },
      complete: () => this.saving.set(false)
    });
  }

  public tags(): string[] {
    return [...new Set(this.form.controls.tags.value.map(tag => tag.trim()).filter(Boolean))];
  }

  public filterTags(query: string): void {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedTags = new Set(this.tags().map(tag => tag.toLowerCase()));
    this.filteredTags.set(this.knownTags().filter(tag =>
      !selectedTags.has(tag.toLowerCase()) && tag.toLowerCase().includes(normalizedQuery)
    ));
  }

  private request(): SnippetRequest {
    const { title, language, description, content } = this.form.getRawValue();
    return {
      title: title.trim(),
      language,
      description: description.trim() || null,
      content,
      tags: this.tags()
    };
  }
}
