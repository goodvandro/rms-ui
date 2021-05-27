import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartRouter } from './start.router';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    StartRouter,
    CardModule,
    ChartModule
  ]
})
export class StartModule { }
