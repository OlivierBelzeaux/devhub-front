import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-error-state',
  imports: [MessageModule],
  templateUrl: './error-state.component.html'
})
export class ErrorStateComponent {
  public readonly message = input.required<string>();
}
