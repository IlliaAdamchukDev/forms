import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'

import { CustomInputComponent } from './custom-input/custom-input.component';
import { CutPipe } from '../shared/pipe/cut.pipe';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    CustomInputComponent,
    CutPipe,
    DialogComponent,
  ],
  exports: [
    CustomInputComponent,
    CutPipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
