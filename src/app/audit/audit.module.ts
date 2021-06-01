import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from "primeng/divider";
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { GroupWorkModule } from '../group-work/group-work.module';
import { AuditRouter } from './audit.router';
import { ClientIndexComponent } from './client-index/client-index.component';
import { FilesComponent } from './files/files.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ReportsComponent } from './reports/reports.component';
import { ShowComponent } from './show/show.component';
import { ClientShowComponent } from './client-show/client-show.component';

@NgModule({
  declarations: [
    IndexComponent,
    NewComponent,
    ShowComponent,
    FilesComponent,
    ReportsComponent,
    ClientIndexComponent,
    ClientShowComponent
  ],
  imports: [
    CommonModule,
    AuditRouter,
    FormsModule,
    GroupWorkModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    TabViewModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    EditorModule,
    ProgressBarModule
  ]
})
export class AuditModule { }
