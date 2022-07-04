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
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { ClientIndexComponent } from './client-index/client-index.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { CompliancesComponent } from './compliances/compliances.component';
import { FilesComponent } from './files/files.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { RecommendationFilterComponent } from './recommendation-filter/recommendation-filter.component';
import { RecommendationRouter } from './recommendation.router';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    IndexComponent,
    NewComponent,
    ShowComponent,
    ClientIndexComponent,
    ClientShowComponent,
    FilesComponent,
    CompliancesComponent,
    RecommendationFilterComponent
  ],
  imports: [
    CommonModule,
    RecommendationRouter,
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
    InputNumberModule,
    DialogModule,
    SidebarModule,
    SliderModule,
    InputNumberModule
  ]
})
export class RecommendationModule { }
