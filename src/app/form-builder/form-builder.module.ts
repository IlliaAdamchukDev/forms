import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';

import { FormBuilderComponent } from './form-builder.component';
import { FormElementComponent } from './components/form-element/form-element.component';
import { AccordionElementComponent } from './components/accordion-element/accordion-element.component';
import { reducers } from './reducers';
import { FormBuilderEffects } from './form-builder.effects';
import { FormsBuilderRoutingModule } from './form-builder-routing.module';
import { formElementNode } from './reducers/form/form.reducer';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormElementComponent,
    AccordionElementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    SharedModule,
    EffectsModule.forFeature([FormBuilderEffects]),
    StoreModule.forFeature(formElementNode, reducers),
    FormsBuilderRoutingModule,
  ],
})
export class FormsBuilderModule {}
