import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CutPipe } from '../shared/pipe/cut.pipe';


@NgModule({
  declarations: [
    CustomInputComponent,
    CutPipe,
  ],
  exports: [
    CustomInputComponent,
    CutPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
