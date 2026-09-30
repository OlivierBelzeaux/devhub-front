import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, CardModule, RouterLink],
  selector: 'app-demo-about-page',
  styleUrl: './demo-about-page.component.scss',
  templateUrl: './demo-about-page.component.html',
})
export class DemoAboutPageComponent {}
