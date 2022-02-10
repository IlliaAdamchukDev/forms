import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { FormBuilderComponent } from './form-builder.component';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { AccordionElementComponent } from './components/accordion-element/accordion-element.component';
import { FormsGuard } from './guards/forms.guard';
import { CutPipe } from '../shared/pipe/cut.pipe';
import { metaReducers, reducers } from './reducers';
import { environment } from '../../environments/environment';

const formRoutes: Routes =[
  { path: 'forms', component: FormBuilderComponent, canActivate: [FormsGuard] },
];

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormFieldsComponent,
    AccordionElementComponent,
    CutPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    RouterModule.forChild(formRoutes)
  ]
})
export class FormsBuilderModule { }
