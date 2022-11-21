import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInQueuePage } from './user-in-queue.page';

const routes: Routes = [
  {
    path: '',
    component: UserInQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInQueuePageRoutingModule {}
