import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueOperationsPage } from './queue-operations.page';

const routes: Routes = [
  {
    path: '',
    component: QueueOperationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueOperationsPageRoutingModule {}
