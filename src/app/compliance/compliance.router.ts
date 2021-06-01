import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientIndexComponent } from './client-index/client-index.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'show/:id',
    component: ShowComponent
  },
  {
    path: 'new',
    component: NewComponent
  },

  {
    path: 'client/index',
    component: ClientIndexComponent
  },
  {
    path: 'client/new',
    component: ClientNewComponent
  },
  {
    path: 'client/show/:id',
    component: ClientShowComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ComplianceRouter { }
