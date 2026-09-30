import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading-state',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading-state.component.html',
  styleUrl: './loading-state.component.scss'
})
export class LoadingStateComponent {
  public readonly label = input.required<string>();
}
