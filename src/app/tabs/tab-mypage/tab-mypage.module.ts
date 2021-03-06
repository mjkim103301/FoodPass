import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMypagePageRoutingModule } from './tab-mypage-routing.module';

import { TabMypagePage } from './tab-mypage.page';
import { SharedComponentModule } from 'src/app/component/shared-component.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { RegisterFoodtruckPageModule } from 'src/app/modal-pages/register-foodtruck/register-foodtruck.module';

// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angular2-qrcode';
import { SharedDataModule } from 'src/app/services/shared-data/shared-data.module';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMypagePageRoutingModule,
    SharedComponentModule,
    RegisterFoodtruckPageModule,
    NgxQRCodeModule,
    QRCodeModule,
  ],
  declarations: [TabMypagePage]
})
export class TabMypagePageModule {}
