import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalParchiService {

  allItems : any = [];
  itemsMap = new Map();

  constructor() { }

  setAllItems(timeFilteredItems)
  {
    this.allItems = [];
    this.allItems = [...timeFilteredItems];
  }

  makeMap()
  {
    this.itemsMap.clear();
    this.allItems.forEach(itemInfo => {
      if(this.itemsMap.has(itemInfo.item))
      {
        let info = this.itemsMap.get(itemInfo.item);
        let updatedObject = {'quantity' : info.quantity + 1, 'CategoryName' : info.CategoryName};
        this.itemsMap.set(itemInfo.item , updatedObject);
      }
      else
      {
        this.itemsMap.set(itemInfo.item , {'quantity' : +itemInfo.quantity , 'CategoryName' : itemInfo.CategoryName});
      }
    });

    console.log(this.itemsMap);
  }
}
