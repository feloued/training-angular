import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'questions',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule)
  },
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'questions' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
