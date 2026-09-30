import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from './core/theme/theme.service';
import { AuthService } from './core/auth/auth.service';
import { ContactLinkService } from './core/contact/contact-link.service';
import { DemoSearchBarComponent } from './features/demo/ui/demo-search-bar/demo-search-bar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, DemoSearchBarComponent, RouterLink, RouterOutlet, ToolbarModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly contact = inject(ContactLinkService);
  readonly theme = inject(ThemeService);

  constructor() {
    this.auth.restoreSession();
  }

  public get showDemoSearch(): boolean {
    return this.router.url.split('?')[0] === '/demo';
  }

  public logout(): void {
    this.auth.logout();
    void this.router.navigate(['/demo']);
  }
}
