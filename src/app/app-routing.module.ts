import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  {
    path: 'questions',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },

  { path: '**', redirectTo: 'questions' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
