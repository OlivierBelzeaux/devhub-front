import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Snippet } from '../../../../core/models/snippet.model';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-snippet-card',
  imports: [ButtonModule, CardModule, CodeBlockComponent, RouterLink, TagModule],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss'
})
export class SnippetCardComponent {
  public readonly snippet = input.required<Snippet>();
  public readonly detailLink = input.required<string[]>();
}
