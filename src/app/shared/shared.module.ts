import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { CutPipe } from '../shared/pipe/cut.pipe';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [CustomInputComponent, CutPipe, DialogComponent],
  exports: [CustomInputComponent, CutPipe, MatDialogModule, MatExpansionModule],
  imports: [CommonModule, MatDialogModule, MatExpansionModule],
})
export class SharedModule {}
