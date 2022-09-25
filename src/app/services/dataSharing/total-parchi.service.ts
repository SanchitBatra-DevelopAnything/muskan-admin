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
        let updatedObject = {'quantity' : info.quantity + 1, 'CategoryName' : info.CategoryName , 'price' : ((+itemInfo.price)/itemInfo.quantity) * (itemInfo.quantity + 1)};
        this.itemsMap.set(itemInfo.item , updatedObject);
      }
      else
      {
        this.itemsMap.set(itemInfo.item , {'quantity' : +itemInfo.quantity , 'CategoryName' : itemInfo.CategoryName , 'price' : +itemInfo.price});
      }
    });
  }

  makeListFromMap()
  {
    let items = [];
    for (let entry of this.itemsMap.entries()) {
      let createdObject = {'item' : entry[0].toString() , 'quantity' : entry[1].quantity , 'CategoryName' : entry[1].CategoryName , 'price': +entry[1].price};
      items.push(createdObject);
  }
  console.log(items);
  return items;
  }
}
