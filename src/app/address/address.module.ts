import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressRouter } from './address.router';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AddressRouter
  ]
})
export class AddressModule { }
