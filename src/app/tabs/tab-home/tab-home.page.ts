import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import { MapService } from 'src/app/services/map/map.service';
import { SearchService } from 'src/app/services/search.service';
import { FoodtruckDataProvider } from 'src/app/services/data-provider/foodtruck.data.provider';
import { FtViewComponent } from 'src/app/component/ft-view/ft-view.component';
import { SearchPage } from 'src/app/modal-pages/search/search.page';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss']
})
export class TabHomePage implements OnInit, OnDestroy {

  constructor(
    public modalCtrl : ModalController,
    private pageCtrl : PageControllerService,
    private sharedData : SharedDataService,
    private foodtruckDataProvider: FoodtruckDataProvider,
    private mapCtrl : MapService,
    private search: SearchService,
  ) { }

  ngOnInit() {
    console.log("tab-home");
    //css가 모두 적용된 이후에 맵을 로딩하기 위한 0.5초 지연실행
    setTimeout(() =>{
      this.mapCtrl.init(document.getElementById('map'));
      this.mapCtrl.setMapChangedHook(()=>{
        //푸드트럭 검색
        
        this.foodtruckDataProvider.foodtruckListByLocation(this.mapCtrl.mapPosition).then(v =>{
          this.mapCtrl.clearPin();
            v.forEach((val) =>{
              this.mapCtrl.addFoodtruckPin(val, (id) =>{
                this.modalCtrl.create({
                  component: FtViewComponent,
                  componentProps: {
                    foodtruckId: id
                  },
                  cssClass: "preview-modal"
                }).then(r =>{
                  r.present()
                })
              });
            })
        })
        console.log("search foodtruck");
        
      })
    }, 500);
  }
  
  get inputData(){
    return this.search.inputData;
  }
  set inputData(val){
    this.search.inputData = val;
  }

  get currentSearched(){
    return this.search.currentSearched;
  }

  showFoodtruckList() {
    this.pageCtrl.presentFoodtruckList();
  }

  get isWatching(){
    return this.sharedData.geolocation.isWatching;
  }

  watchPosition(){
    if(this.isWatching){
      this.sharedData.geolocation.stopWatching();
      this.mapCtrl.removePositionCircle();
    }
    else{
      this.sharedData.geolocation.getLocation().then(
        (location) =>{
          this.mapCtrl.makePositionCircle(this.sharedData.geolocation.currentLocation);
          this.mapCtrl.moveMapToLocation(this.sharedData.geolocation.currentLocation);
        }
      );
      this.sharedData.geolocation.watchLocation((location) =>{
        this.mapCtrl.movePositionCircleToLocation(location);
      });
    }
  }

  searchStart(){
    this.modalCtrl.create({
      component: SearchPage,
      cssClass: 'modal-fullscreen'
    }).then(r => r.present())
  }

  ngOnDestroy(){
    this.sharedData.geolocation.stopWatching();
  }
}
