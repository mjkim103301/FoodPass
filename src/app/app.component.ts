import { Component, OnInit } from '@angular/core';
import { firebase } from "@firebase/app";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SharedDataService } from './services/shared-data/shared-data.service';
import { NotificationService } from './services/notification.service';
import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/messaging';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sharedData: SharedDataService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      console.log("app start");
      this.sharedData.account.init().then(()=>{
        this.appReady();
      }).catch(e =>{
        console.log(e);
        //id 받아오지 못함
      });
      
    });

  }

  appReady(){
    this.splashScreen.hide();
  }
  appNotReady(){
    alert('id를 받아오지 못했습니다.');
  }
}
