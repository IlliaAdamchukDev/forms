import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { FormsGuard } from 'src/app/form-builder/guards/forms.guard';

const formRoutes: Routes = [
  { path: '', component: FormBuilderComponent, canActivate: [FormsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule],
})
export class FormsBuilderRoutingModule {}
