import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { FormsBuilderModule } from './form-builder/form-builder.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFountPageComponent } from './not-fount-page/not-fount-page.component';

const appRoutes: Routes = [{ path: '**', component: NotFountPageComponent }];

@NgModule({
  declarations: [AppComponent, NotFountPageComponent],
  exports: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    FormsBuilderModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
