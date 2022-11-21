import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueOperationsPageRoutingModule } from './queue-operations-routing.module';

import { QueueOperationsPage } from './queue-operations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueueOperationsPageRoutingModule
  ],
  declarations: [QueueOperationsPage]
})
export class QueueOperationsPageModule {}
