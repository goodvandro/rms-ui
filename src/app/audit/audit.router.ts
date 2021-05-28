import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ToLoggedEntityComponent } from './to-logged-entity/to-logged-entity.component';

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
    path: 'by-logged-entity',
    component: ToLoggedEntityComponent
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
export class AuditRouter { }
