import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { AddressRouter } from './address.router';
import { FastNewComponent } from './fast-new/fast-new.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { AddressFilterComponent } from './address-filter/address-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    NewComponent,
    FastNewComponent,
    AddressFilterComponent,
  ],
  imports: [
    CommonModule,
    AddressRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    TabViewModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    CalendarModule,
    SidebarModule,
  ],
  exports: [FastNewComponent],
})
export class AddressModule {}
