import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormBuilderComponent } from './form-builder.component';
import { FormsGuard } from './guards/forms.guard';

const formRoutes: Routes = [
  { path: '', component: FormBuilderComponent, canActivate: [FormsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule],
})
export class FormsBuilderRoutingModule {}
