import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from './core/theme/theme.service';
import { DemoSearchBarComponent } from './features/demo/ui/demo-search-bar/demo-search-bar.component';

@Component({
  imports: [ButtonModule, DemoSearchBarComponent, RouterLink, RouterOutlet, ToolbarModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly theme = inject(ThemeService);
}
