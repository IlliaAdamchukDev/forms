import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [AuthService],
  exports: [LoginComponent],
})
export class AuthModule {}
