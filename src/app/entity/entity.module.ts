import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddressModule } from './../address/address.module';
import { EntityRouter } from './entity.router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EntityFilterComponent } from './entity-filter/entity-filter.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    NewComponent,
    EntityFilterComponent,
  ],
  imports: [
    CommonModule,
    EntityRouter,
    FormsModule,
    AddressModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    DropdownModule,
    InputSwitchModule,
    ProgressBarModule,
    FieldsetModule,
    CalendarModule,
    SidebarModule,
  ],
})
export class EntityModule {}
