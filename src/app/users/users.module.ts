import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { FeatherModule } from 'angular-feather';
import { Edit2, Plus, Loader, Check, AlertTriangle } from 'angular-feather/icons';

const icons = {
  Edit2,
  Plus,
  Loader,
  Check,
  AlertTriangle
};

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      class: "page-dashboard"
    }
  }, {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      class: "page-profile"
    }
  }, {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {
      class: "page-cart"
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FeatherModule.pick(icons)
  ]
})
export class UsersModule { }
