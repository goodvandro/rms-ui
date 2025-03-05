import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { CastComponent } from './cast/cast.component';
import { GroupWorkByAuditComponent } from './group-work-by-audit/group-work-by-audit.component';
import { GroupWorkRouter } from './group-work.router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { GroupWorkFilterComponent } from './group-work-filter/group-work-filter.component';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { AuditModule } from '../audit/audit.module';
import { AuditByGroupWorkComponent } from './audit-by-group-work/audit-by-group-work.component';

@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    NewComponent,
    CastComponent,
    GroupWorkByAuditComponent,
    GroupWorkFilterComponent,
    AuditByGroupWorkComponent,
  ],
  imports: [
    CommonModule,
    GroupWorkRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    TabViewModule,
    MultiSelectModule,
    ProgressBarModule,
    SidebarModule,
    CalendarModule,
  ],
  exports: [GroupWorkByAuditComponent],
})
export class GroupWorkModule {}
