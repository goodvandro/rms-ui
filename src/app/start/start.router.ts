import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthGuardFirstUser } from './../auth/guard/isFirst.guard';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: IndexComponent,
    canActivate: [AuthGuard, AuthGuardFirstUser]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StartRouter { }
