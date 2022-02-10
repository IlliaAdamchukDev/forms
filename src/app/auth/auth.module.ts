import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { LoginComponent } from './login/login.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';

const authRoutes: Routes =[
  { path: '', component: LoginComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule { }
