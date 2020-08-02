import { Injectable } from '@angular/core';
import { TabHomeData as TabHomeData } from './tab-home-data/TabHomeData';
import { TabOrderData } from './tab-order-data/TabOrderData';
import { DataControllerService } from '../data-controller/data-controller.service';
import { ConfigData } from './config-data/ConfigData';
import { SharedDataService } from '../../shared-data/shared-data.service';
import { ModalData } from './modal-data/ModalData';

@Injectable()
export class PageDataStorageService {

  

  //---user-config
  config : ConfigData;

  modal : ModalData;

  //---home
  tabHome : TabHomeData;

  //---order
  tabOrder : TabOrderData;

  
  constructor(userConfig : SharedDataService, dataCtrl : DataControllerService) {
    this.config = new ConfigData(userConfig, dataCtrl);
    this.modal = new ModalData(dataCtrl);
    this.tabHome = new TabHomeData(dataCtrl);
    this.tabOrder = new TabOrderData(dataCtrl);

  }

}
