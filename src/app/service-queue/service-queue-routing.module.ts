import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceQueuePage } from './service-queue.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceQueuePageRoutingModule {}
