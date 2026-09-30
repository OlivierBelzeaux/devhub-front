import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { publicDemoGuard } from './core/auth/public-demo.guard';

export const routes: Routes = [
  { path: 'demo', canActivate: [publicDemoGuard], loadComponent: () => import('./features/demo/pages/demo-snippet-list-page/demo-snippet-list-page.component').then(component => component.DemoSnippetListPageComponent) },
  { path: 'demo/snippets/:id', canActivate: [publicDemoGuard], loadComponent: () => import('./features/demo/pages/demo-snippet-detail-page/demo-snippet-detail-page.component').then(component => component.DemoSnippetDetailPageComponent) },
  { path: 'demo/a-propos', canActivate: [publicDemoGuard], loadComponent: () => import('./features/demo/pages/demo-about-page/demo-about-page.component').then(component => component.DemoAboutPageComponent) },
  { path: 'login', canActivate: [publicDemoGuard], loadComponent: () => import('./features/auth/pages/login-page/login-page.component').then(component => component.LoginPageComponent) },
  { path: 'snippets', canActivate: [authGuard], loadComponent: () => import('./features/snippets/pages/snippet-list-page/snippet-list-page.component').then(component => component.SnippetListPageComponent) },
  { path: 'snippets/new', canActivate: [authGuard], loadComponent: () => import('./features/snippets/pages/snippet-form-page/snippet-form-page.component').then(component => component.SnippetFormPageComponent), data: { mode: 'create' } },
  { path: 'snippets/:id/edit', canActivate: [authGuard], loadComponent: () => import('./features/snippets/pages/snippet-form-page/snippet-form-page.component').then(component => component.SnippetFormPageComponent), data: { mode: 'edit' } },
  { path: 'snippets/:id', canActivate: [authGuard], loadComponent: () => import('./features/snippets/pages/snippet-detail-page/snippet-detail-page.component').then(component => component.SnippetDetailPageComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: '**', redirectTo: 'demo' }
];
