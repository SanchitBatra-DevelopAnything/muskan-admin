import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  public getAdmins() : Observable<any> {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/admins.json');
  }

  public getNotificationCount():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/retailerNotifications.json?shallow=true');
  }

  public getCategories():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/Categories.json');
  }

  public deleteCategory(key:string) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/'+key+".json");
  }

  public getRetailerNotifications() : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/retailerNotifications.json");
  }

  public deleteRetailerNotification(notificationKey : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/retailerNotifications/" + notificationKey + ".json");
  }

  public approveRetailerNotification(notificationKey : string , notificationData : {retailerName : string , shopAddress : string}) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/Retailers.json' , notificationData);
  }

  public addShop(shop:{shopName : string , areaName : string}) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/Shops.json' , shop);
  }

  public getShops():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/Shops.json');
  }

  public deleteShop(shopKey : string) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/Shops/'+shopKey+".json");
  }

  public getRetailers() : Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/Retailers.json')
  }

  public deleteRetailer(retailerKey : string) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/Retailers/' + retailerKey + ".json");
  }

  public addSalesman(salesman : {salesmanName : string}) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/Salesmen.json' , salesman);
  }

  public getSalesman() : Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/Salesmen.json');
  }

  public deleteSalesman(salesmanKey : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/Salesmen/"+salesmanKey+".json");
  }

  public addSubcategory(subcategory : {subcategoryName : string} , parentCategoryKey : string) : Observable<any>
  {
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Subcategories.json", subcategory);
  }

  public addItem(item : {itemName : string , imageUrl : string , subcategoryName : string , directVariety : string , offer: string , shopPrice : string , customerPrice : string} , parentCategoryKey : string , parentSubcategoryKey : string) : Observable<any>
  {
    if(item.directVariety === "1")
    {
      return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Items.json",item);
    }
    else
    {
      return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Subcategories/"+parentSubcategoryKey+"/Items.json" , item);
    }
  }

  public getSubcategoriesOfCategory(categoryKey : string) : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+"/Subcategories.json");
  }

  public getItems(subcategoryKey : string , categoryKey : string) : Observable<any>
  {
    if(subcategoryKey === 'dv')
    {
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+"/Items.json");
    }
    else
    {
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+ "/Subcategories/"+subcategoryKey+"/Items.json")
    }
  }

  public deleteItem(parentCategoryKey : string , parentSubcategoryKey : string , itemKey : string) : Observable<any>
  {
    if(parentSubcategoryKey === "dv")
    {
      return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Items/" + itemKey+ ".json");
    }
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Subcategories/"+parentSubcategoryKey+"/Items/"+itemKey+".json");
  }

  public editItem(itemKey : string , parentSubcategoryKey : string , parentCategoryKey : string , updatedItem : any) : Observable<any>
  {
    if(parentSubcategoryKey === "dv")
    {
      return this.http.put("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Items/" + itemKey+ ".json" , updatedItem);
    }
    return this.http.put("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+parentCategoryKey+ "/Subcategories/"+parentSubcategoryKey+"/Items/"+itemKey+".json" , updatedItem);
  }

  public getActiveOrders(todaysDate)
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/"+todaysDate+".json");
  }

  public getOrder(orderDate , orderKey , orderType) : Observable<any>
  {
    if(orderType.startsWith ("processed"))
    {
      let processedOrderKeyArray = orderType.split("?");
      let processedOrderKey = processedOrderKeyArray[1];
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+orderDate+"/"+processedOrderKey+".json")  
    }
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/"+orderDate+"/"+orderKey+".json");
  }

  public makeOrderForChef(orderData : any , orderDate:any) : Observable<any>
  {
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+orderDate+".json" , orderData);
  }

  public deleteActiveOrder(orderKey : string , orderDate : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/"+orderDate+"/"+orderKey+".json");
  }

  public getProcessedShopOrders(date:string) : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+date+".json");
  }
}
