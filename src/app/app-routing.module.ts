import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then(m => m.GroupModule)
  },
  {
    path: 'group-work',
    loadChildren: () => import('./group-work/group-work.module').then(m => m.GroupWorkModule)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule)
  },
  {
    path: 'entity',
    loadChildren: () => import('./entity/entity.module').then(m => m.EntityModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation/recommendation.module').then(m => m.RecommendationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
