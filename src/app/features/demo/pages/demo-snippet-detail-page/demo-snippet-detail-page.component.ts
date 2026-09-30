import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Snippet } from '../../../../core/models/snippet.model';
import { DemoSnippetApiService } from '../../data-access/demo-snippet-api.service';
import { CodeBlockComponent } from '../../ui/code-block/code-block.component';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, CardModule, CodeBlockComponent, ErrorStateComponent, LoadingStateComponent, RouterLink, TagModule],
  templateUrl: './demo-snippet-detail-page.component.html',
  styleUrl: './demo-snippet-detail-page.component.scss'
})
export class DemoSnippetDetailPageComponent implements OnInit {
  readonly snippet = signal<Snippet | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor(private readonly route: ActivatedRoute, private readonly demoSnippetApi: DemoSnippetApiService) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Identifiant de snippet manquant.');
      this.loading.set(false);
      return;
    }
    this.demoSnippetApi.findById(id).subscribe({
      next: snippet => this.snippet.set(snippet),
      error: () => { this.error.set('Ce snippet est introuvable ou indisponible.'); this.loading.set(false); },
      complete: () => this.loading.set(false)
    });
  }
}
