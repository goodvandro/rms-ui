import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportRecommendationComponent } from './report-recommendation/report-recommendation.component';

const routes: Routes = [
  {
    path: 'recommendation',
    component: ReportRecommendationComponent
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
export class AuditReportRouter { }
