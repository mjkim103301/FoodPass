import { FoodtruckData } from 'src/app/data/foodtruck';
import { Injectable } from '@angular/core';
import { DataStorage } from './data.storage';
import { OptionData } from 'src/app/data/option';
import { MenuData } from 'src/app/data/menu';
import { FoodtruckDataProvider } from '../data-provider/foodtruck.data.provider';
import { MenuDataProvider } from '../data-provider/menu.data.provider';
import { OptionDataProvider } from '../data-provider/option.data.provider';
import { DefaultValue } from 'src/environments/defaultValue';

@Injectable()
export class FoodtruckDataCtrl {
    private dataStorage = new DataStorage<DataStorage<DataStorage<OptionData>>>();

    currentFoodtrucks : FoodtruckData[] = [];
    FoodtruckMenus: MenuData[]=[];
    constructor(
        private ftProvider: FoodtruckDataProvider,
        private menuProvider: MenuDataProvider,
        private optionProvider: OptionDataProvider
    ){

    }

    findFoodtruckById(id: number) : FoodtruckData {
        let ft = this.dataStorage.getData(id)

        if(ft != undefined){
            return ft.data as FoodtruckData
        } else {
            return this.foodtruckAlternative(id)
        }
    }

    private foodtruckAlternative(foodtruckId: number) : FoodtruckData {
        let answer = { ...DefaultValue.foodtruckData, id: foodtruckId }
        this.setFoodtruckData(answer)
        this.ftProvider.getItem(foodtruckId).then(r =>{
            answer.rating = r.rating
            answer.waiting = r.waiting
            answer.localData = r.localData
            answer.location = r.location
            answer.imgSrc = r.imgSrc
            answer.notice = r.notice
            answer.introduction = r.introduction
            answer.name = r.name
        })
        return answer
    }

    setFoodtruckData(...data: FoodtruckData[]){
        console.log(`setFoodtruckData`)
        data.forEach((val)=>{
            if (!this.dataStorage.has(val.id)){
                this.dataStorage.setData(new DataStorage<DataStorage<OptionData>>(val));
                console.log(this.findFoodtruckById(val.id))
            }
        })
        
    }

    getMenuList(foodtruckId: number) : MenuData[] {
        let ft = this.dataStorage.getData(foodtruckId)
        return ft ? ft.toArray().map((value) => {
            return value.data as MenuData
        }) : []
    }

    findMenuById(foodtruckId: number, id: number) : MenuData {
        
        let ft = this.dataStorage.getData(foodtruckId)
      
        if(ft == null){
            this.foodtruckAlternative(foodtruckId)
            return this.menuAlternative(foodtruckId, id)
        }
        let menu = ft.getData(id)
      
        return menu ? menu.data as MenuData : this.menuAlternative(foodtruckId, id)
    }

    private menuAlternative(foodtruckId: number, id: number) : MenuData {
        const answer = { ...DefaultValue.menuData, id: id }
        this.setMenuData(foodtruckId, answer)

        this.menuProvider.getItem(foodtruckId, id).then(r =>{
            answer.menuName = r.menuName
            answer.imgsrc = r.imgsrc
            answer.menuInformation = r.menuInformation
            answer.price = r.price
        })
        return answer
    }

    setMenuData(foodtruckId: number, ...data: MenuData[]){
      
        this.FoodtruckMenus=data
        data.forEach((val)=>{
            this.dataStorage.getData(foodtruckId).setData(new DataStorage<OptionData>(val));
        })
        
    }

    getOptionList(foodtruckId: number, menuId: number) : OptionData[] {
        let ft = this.dataStorage.getData(foodtruckId)
        if(ft == null){
            return [ DefaultValue.optionData ];
        }
        let menu = ft.getData(menuId)
        return menu ? menu.toArray() : [];
    }


    findOptionById(foodtruckId: number, menuId: number, id: number) : OptionData {
        let ft = this.dataStorage.getData(foodtruckId)
        if(ft == null){
            this.foodtruckAlternative(foodtruckId)
            this.menuAlternative(foodtruckId, menuId)
            return this.optionAlternative(foodtruckId, menuId, id)
        }
        let menu = ft.getData(menuId)
        if(menu == null) {
            this.menuAlternative(foodtruckId, menuId)
            return this.optionAlternative(foodtruckId, menuId, id)
        }

        let option = menu.getData(id)
        return option ? option : this.optionAlternative(foodtruckId, menuId, id)

    }

    private optionAlternative(foodtruckId: number, menuId: number, id: number) : OptionData {
        let mock : OptionData = { ...DefaultValue.optionData, id: id }
        this.setOptionData(foodtruckId, menuId, [mock])

        this.optionProvider.getItem(foodtruckId, menuId, id).then(r =>{
            mock.name = r.name
            mock.extraPrice = r.extraPrice
        })

        return mock
    }

    setOptionData(foodtruckId: number, menuId: number, data: OptionData[]){
        console.log(`setOptionData`)
        data.forEach((val)=>{
            this.dataStorage.getData(foodtruckId).getData(menuId).setData(val);
        })
        
    }
    
}