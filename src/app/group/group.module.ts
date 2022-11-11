import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { GroupRouter } from './group.router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { GroupFilterComponent } from './group-filter/group-filter.component';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    NewComponent,
    GroupFilterComponent,
  ],
  imports: [
    CommonModule,
    GroupRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    TabViewModule,
    SidebarModule,
    CalendarModule,
  ],
})
export class GroupModule {}
