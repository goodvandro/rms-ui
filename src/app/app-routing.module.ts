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
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module')
      .then(m => m.ActivityModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module')
      .then(m => m.GroupModule)
  },
  {
    path: 'group-work',
    loadChildren: () => import('./group-work/group-work.module')
      .then(m => m.GroupWorkModule)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module')
      .then(m => m.AuditModule)
  },
  {
    path: 'audit-type',
    loadChildren: () => import('./audit-type/audit-type.module')
      .then(m => m.AuditTypeModule)
  },
  {
    path: 'audit-status',
    loadChildren: () => import('./audit-status/audit-status.module')
      .then(m => m.AuditStatusModule)
  },
  {
    path: 'entity',
    loadChildren: () => import('./entity/entity.module')
      .then(m => m.EntityModule)
  },
  {
    path: 'entity-level',
    loadChildren: () => import('./entity-level/entity-level.module')
      .then(m => m.EntityLevelModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation/recommendation.module')
      .then(m => m.RecommendationModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module')
      .then(m => m.AddressModule)
  },
  {
    path: 'permission',
    loadChildren: () => import('./permission/permission.module')
      .then(m => m.PermissionModule)
  },
  {
    path: 'recommendation-status',
    loadChildren: () => import('./recommendation-status/recommendation-status.module')
      .then(m => m.RecommendationStatusModule)
  },
  {
    path: 'recommendation-nature',
    loadChildren: () => import('./recommendation-nature/recommendation-nature.module')
      .then(m => m.RecommendationNatureModule)
  },
  {
    path: 'recommendation-character',
    loadChildren: () => import('./recommendation-character/recommendation-character.module')
      .then(m => m.RecommendationCharacterModule)
  },
  {
    path: 'recommendation-level-risk',
    loadChildren: () => import('./recommendation-level-risk/recommendation-level-risk.module')
      .then(m => m.RecommendationLevelRiskModule)
  },
  {
    path: 'compliance',
    loadChildren: () => import('./compliance/compliance.module')
      .then(m => m.ComplianceModule)
  },
  {
    path: 'compliance-level',
    loadChildren: () => import('./compliance-level/compliance-level.module')
      .then(m => m.ComplianceLevelModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
