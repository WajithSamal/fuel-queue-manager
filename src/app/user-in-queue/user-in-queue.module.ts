import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInQueuePageRoutingModule } from './user-in-queue-routing.module';

import { UserInQueuePage } from './user-in-queue.page';
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInQueuePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [UserInQueuePage]
})
export class UserInQueuePageModule {}
