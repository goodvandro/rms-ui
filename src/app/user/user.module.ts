import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadComponent } from './read/read.component';
import { UserRouter } from './user.router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ReadComponent, CreateComponent],
  imports: [
    CommonModule,
    UserRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule
  ]
})
export class UserModule { }
