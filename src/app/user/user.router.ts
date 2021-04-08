import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {
    path: 'read',
    component: ReadComponent
  },

  {
    path: 'read/:id',
    component: UpdateComponent
  },

  {
    path: 'new',
    component: CreateComponent
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
export class UserRouter { }
