import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from "primeng/divider";
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { EntityRouter } from './entity.router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    EntityRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    DropdownModule,
    InputSwitchModule
  ]
})
export class EntityModule { }
