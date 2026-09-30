import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  imports: [ButtonModule, CardModule, RouterLink],
  templateUrl: './snippet-form-page.component.html',
  styleUrl: './snippet-form-page.component.scss'
})
export class SnippetFormPageComponent {
  readonly mode = inject(ActivatedRoute).snapshot.data['mode'] as 'create' | 'edit';
}
