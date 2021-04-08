import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ActivityRouter } from './activity.router';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    ActivityRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    TooltipModule
  ]
})
export class ActivityModule { }
