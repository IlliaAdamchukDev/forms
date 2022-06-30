import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFountPageComponent } from './not-fount-page/not-fount-page.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./form-builder/form-builder.module').then(
        (m) => m.FormsBuilderModule
      ),
  },
  { path: '**', component: NotFountPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
