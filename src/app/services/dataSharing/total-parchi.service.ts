import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalParchiService {

  allItems : any = [];
  itemsMap = new Map();

  ordersForItemWiseDetail:any = [];

  constructor() { }

  setAllItems(timeFilteredItems)
  {
    this.allItems = [];
    this.allItems = [...timeFilteredItems];
  }

  setOrdersForItemWiseDetails(orders)
  {
    this.ordersForItemWiseDetail = [];
    this.ordersForItemWiseDetail = [...orders];
  }

  makeMap()
  {
    this.itemsMap.clear();
    this.allItems.forEach(itemInfo => {
      if(this.itemsMap.has(itemInfo.item))
      {
        let info = this.itemsMap.get(itemInfo.item);
        let updatedObject = {'quantity' : +info.quantity + +itemInfo.quantity, 'CategoryName' : info.CategoryName , 'price' : ((+itemInfo.price)/itemInfo.quantity) * (itemInfo.quantity + 1)};
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

  getItemWiseDetail(itemName:string)
  {
    let answer = [];
    for(let i=0;i<this.ordersForItemWiseDetail.length;i++)
    {
      for(let j=0;j<this.ordersForItemWiseDetail[i].items.length;j++)
      {
        if(this.ordersForItemWiseDetail[i].items[j].item.toString().toLowerCase() == itemName.toString().toLowerCase())
        {
          answer.push({'item' : itemName , 'qty' : this.ordersForItemWiseDetail[i].items[j].quantity , 'orderedBy' : this.ordersForItemWiseDetail[i].shopAddress});
        }
      }
    }
    return answer;
  }
}
