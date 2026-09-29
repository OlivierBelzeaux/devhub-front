import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private static readonly storageKey = 'devhub.theme';
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly current = signal<Theme>(this.readTheme());

  constructor() {
    this.apply(this.current());
  }

  isDark(): boolean {
    return this.current() === 'dark';
  }

  toggle(): void {
    this.set(this.isDark() ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.current.set(theme);
    this.apply(theme);
    if (this.isBrowser) {
      sessionStorage.setItem(ThemeService.storageKey, theme);
    }
  }

  private readTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }
    return sessionStorage.getItem(ThemeService.storageKey) === 'dark' ? 'dark' : 'light';
  }

  private apply(theme: Theme): void {
    this.document.documentElement.classList.toggle('app-dark', theme === 'dark');
  }
}
