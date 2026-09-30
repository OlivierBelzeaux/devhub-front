import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { Snippet } from '../../../../core/models/snippet.model';
import { CodeBlockComponent } from '../../../demo/ui/code-block/code-block.component';
import { SnippetService } from '../../data-access/snippet.service';

@Component({
  imports: [ButtonModule, CardModule, CodeBlockComponent, ConfirmDialogModule, MessageModule, ProgressSpinnerModule, RouterLink, TagModule],
  providers: [ConfirmationService],
  templateUrl: './snippet-detail-page.component.html',
  styleUrl: './snippet-detail-page.component.scss'
})
export class SnippetDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snippetService = inject(SnippetService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly snippet = signal<Snippet | null>(null);
  public readonly loading = signal(true);
  public readonly error = signal<string | null>(null);
  public readonly deleting = signal(false);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Identifiant de snippet manquant.');
      this.loading.set(false);
      return;
    }

    this.snippetService.findById(id).subscribe({
      next: snippet => this.snippet.set(snippet),
      error: () => {
        this.error.set('Ce snippet est introuvable ou indisponible.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }

  public confirmDelete(id: string): void {
    this.confirmationService.confirm({
      header: 'Supprimer le snippet',
      message: 'Cette action est définitive. Voulez-vous supprimer ce snippet ?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      acceptButtonProps: { severity: 'danger' },
      accept: () => this.delete(id)
    });
  }

  private delete(id: string): void {
    this.deleting.set(true);
    this.error.set(null);
    this.snippetService.delete(id).subscribe({
      next: () => void this.router.navigate(['/snippets']),
      error: () => {
        this.error.set('La suppression du snippet a échoué.');
        this.deleting.set(false);
      }
    });
  }
}
