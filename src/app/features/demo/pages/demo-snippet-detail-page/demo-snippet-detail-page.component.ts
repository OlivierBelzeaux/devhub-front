import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { Snippet } from '../../../../core/models/snippet.model';
import { DemoSnippetApiService } from '../../data-access/demo-snippet-api.service';
import { CodeBlockComponent } from '../../ui/code-block/code-block.component';

@Component({
  imports: [ButtonModule, CardModule, CodeBlockComponent, MessageModule, ProgressSpinnerModule, RouterLink, TagModule],
  templateUrl: './demo-snippet-detail-page.component.html',
  styleUrl: './demo-snippet-detail-page.component.scss'
})
export class DemoSnippetDetailPageComponent implements OnInit {
  readonly snippet = signal<Snippet | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor(private readonly route: ActivatedRoute, private readonly demoSnippetApi: DemoSnippetApiService) {}

  ngOnInit(): void {
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
