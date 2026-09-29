import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'demo', loadComponent: () => import('./features/demo/pages/demo-snippet-list-page/demo-snippet-list-page.component').then(component => component.DemoSnippetListPageComponent) },
  { path: 'demo/snippets/:id', loadComponent: () => import('./features/demo/pages/demo-snippet-detail-page/demo-snippet-detail-page.component').then(component => component.DemoSnippetDetailPageComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: '**', redirectTo: 'demo' }
];
