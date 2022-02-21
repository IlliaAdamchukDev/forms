import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { CutPipe } from '../shared/pipe/cut.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { NotNullPipe } from './pipe/not-null.pipe';

@NgModule({
  declarations: [CustomInputComponent, CutPipe, DialogComponent, NotNullPipe],
  exports: [
    CustomInputComponent,
    CutPipe,
    MatDialogModule,
    MatExpansionModule,
    NotNullPipe,
  ],
  imports: [CommonModule, MatDialogModule, MatExpansionModule],
})
export class SharedModule {}
