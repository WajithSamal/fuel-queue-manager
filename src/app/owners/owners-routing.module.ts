import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPage } from './owners.page';

const routes: Routes = [
  {
    path: '',
    component: OwnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPageRoutingModule {}
