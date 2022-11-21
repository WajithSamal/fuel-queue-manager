import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceQueuePageRoutingModule } from './service-queue-routing.module';

import { ServiceQueuePage } from './service-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceQueuePageRoutingModule
  ],
  declarations: [ServiceQueuePage]
})
export class ServiceQueuePageModule {}
