import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { ComplianceRouter } from './compliance.router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { FilesComponent } from './files/files.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { ClientIndexComponent } from './client-index/client-index.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { HistoriesComponent } from './histories/histories.component';
import { ComplianceFilterComponent } from './compliance-filter/compliance-filter.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    IndexComponent,
    NewComponent,
    ShowComponent,
    FilesComponent,
    ClientShowComponent,
    ClientIndexComponent,
    ClientNewComponent,
    HistoriesComponent,
    ComplianceFilterComponent,
  ],
  imports: [
    CommonModule,
    ComplianceRouter,
    FormsModule,
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
    EditorModule,
    ProgressBarModule,
    FieldsetModule,
    DynamicDialogModule,
    DialogModule,
    SidebarModule,
  ],
})
export class ComplianceModule {}
