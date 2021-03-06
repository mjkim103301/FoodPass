import { Component, Input } from '@angular/core';
import { FoodtruckDataCtrl } from 'src/app/services/data-ctrl/foodtruck.data.ctrl';

@Component({
  selector: 'comp-tag-waiting',
  templateUrl: './tag-waiting.component.html',
  styleUrls: ['./tag-waiting.component.scss'],
})
export class TagWaitingComponent {
  @Input() foodtruckId: number;

  constructor(
    private dataCtrl: FoodtruckDataCtrl
  ) {}

  get isValid(){
    return this.waitingData != undefined
  }

  get waitingData() {
    return this.dataCtrl.findFoodtruckById(this.foodtruckId).waiting;
  }
  get waitingTime() {
    return this.waitingData.time
  }

  get waitingPerson(){
    return this.waitingData.person
  }
}
