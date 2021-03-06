import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import { FoodtruckData } from 'src/app/data/foodtruck';
import { ModalController } from '@ionic/angular';
import { RegisterFoodtruckPage } from 'src/app/modal-pages/register-foodtruck/register-foodtruck.page';


@Component({
  selector: 'app-tab-mypage',
  templateUrl: './tab-mypage.page.html',
  styleUrls: ['./tab-mypage.page.scss'],
})
export class TabMypagePage implements OnInit {
  
  elementType = 'url';
  value = 'Techiediaries';
  
  myFoodtruck : FoodtruckData
  // qrData : string


  constructor(
    private config : SharedDataService,
    private push : NotificationService,
    private pageCtrl : PageControllerService,
    private sharedData : SharedDataService,
    private modalCtrl : ModalController
  ) { }


  get link(){
    return `localhost:8100/foodtruck/${this.myFoodtruck.id}`
  }

  ngOnInit() {
    // this.master();
    this.myFoodtruck = {
      id: 10011,
      name: "master",
      introduction: "운영자용 수정 푸드트럭",
      notice: "수정 공지"
    }
    this.sharedData.foodtruckOwner = false;
  }

  get isOpened() : boolean{
    return this.sharedData.isFoodtruckOpen;
  }

  get admin() : boolean{
    return this.config.foodtruckOwner;
  }

  set admin(b : boolean){
    this.config.foodtruckOwner = b;
  }

  requestPermission(){
    // this.push.requestPermission()
    console.log('requestPermission');
  }

  async presentRegisterFoodtruck(){
    let page = await this.modalCtrl.create({
      component:RegisterFoodtruckPage,
      cssClass: 'modal-fullscreen'
    })

    page.present();
  }

  showOrderHistory(){
    this.pageCtrl.presentOrderHistory();
  }

  master(){
    this.admin = true;
    this.pageCtrl.presentFoodtruck();
  }

  registerMyFoodtruck(){
    this.isOwner = !this.isOwner;
  }

  set isOwner(b : boolean){
    this.sharedData.foodtruckOwner = b;
  }

  get isOwner(){
    return this.sharedData.foodtruckOwner;
  }

  // getImage(): void {
  //   const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  //   const imageData = canvas.toDataURL("image/jpeg").toString();
  //   alert(imageData);
  //   }
  
}
