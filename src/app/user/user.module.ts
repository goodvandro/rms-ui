import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from "primeng/divider";
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { AddressModule } from '../address/address.module';
import { CreateComponent } from './create/create.component';
import { GroupsComponent } from './groups/groups.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { UserRouter } from './user.router';

@NgModule({
  declarations: [
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    UserRouter,
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
    TabViewModule,
    DialogModule,
    MultiSelectModule
  ]
})
export class UserModule { }
