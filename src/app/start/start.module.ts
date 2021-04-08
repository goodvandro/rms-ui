import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartRouter } from './start.router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    StartRouter
  ]
})
export class StartModule { }
