import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { IndexComponent } from './index/index.component';
import { RecommendationCharacterRouter } from './recommendation-character.router';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [IndexComponent, ShowComponent, NewComponent],
  imports: [
    CommonModule,
    RecommendationCharacterRouter,
    FormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    TabViewModule,
    DialogModule
  ]
})
export class RecommendationCharacterModule { }
