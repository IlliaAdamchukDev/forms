import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { FormFieldsComponent } from 'src/app/form-builder/components/form-fields/form-fields.component';
import { AccordionElementComponent } from 'src/app/form-builder/components/accordion-element/accordion-element.component';
import { reducers } from 'src/app/form-builder/reducers';
import { FormBuilderEffects } from 'src/app/form-builder/form-builder.effects';
import { FormsBuilderRoutingModule } from 'src/app/form-builder/form-builder-routing.module';
import { fieldNode } from 'src/app/form-builder/reducers/field/field.reducer';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormFieldsComponent,
    AccordionElementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    SharedModule,
    EffectsModule.forFeature([FormBuilderEffects]),
    StoreModule.forFeature(fieldNode, reducers),
    FormsBuilderRoutingModule,
  ],
})
export class FormsBuilderModule {}
