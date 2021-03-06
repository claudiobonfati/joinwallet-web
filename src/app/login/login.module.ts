import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { Loader, Check, AlertTriangle } from 'angular-feather/icons';

const icons = {
  Loader,
  Check,
  AlertTriangle
};

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeatherModule.pick(icons),
  ]
})
export class LoginModule { }
