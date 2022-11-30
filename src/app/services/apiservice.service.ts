import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

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

  public getActiveOrdersCount():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders.json?shallow=true');
  }

  public getCategories():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/onlyCategories.json');
  }

  public deleteCategory(key:string) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/'+key+".json");
  }

  public getNotifications() : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/retailerNotifications.json");
  }

  public deleteNotification(notificationKey : string) : Observable<any>
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

  public addItem(item : any , parentCategoryKey : string , parentSubcategoryKey : string) : Observable<any>
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

  public getActiveOrders()
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders.json");
  }

  public getOrder(orderDate,orderKey , orderType , orderedBy) : Observable<any>
  {
    if(orderType.startsWith ("processed") && !orderedBy.startsWith("distributor"))
    {
      let processedOrderKeyArray = orderType.split("?");
      let processedOrderKey = processedOrderKeyArray[1];
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+orderDate+"/"+processedOrderKey+".json")  
    }
    if(orderType.startsWith ("processed") && orderedBy.startsWith("distributor"))
    {
      let processedOrderKeyArray = orderType.split("?");
      let processedOrderKey = processedOrderKeyArray[1];
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedDistributorOrders/"+orderDate+"/"+processedOrderKey+".json")  
    }
    if(orderedBy.startsWith("distributor"))
    {
      return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeDistributorOrders/"+orderKey+".json");  
    }
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/"+orderKey+".json");
  }

  public makeOrderForChef(orderData : any , orderDate:any) : Observable<any>
  {
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+orderDate+".json" , orderData);
  }

  public deleteActiveOrder(orderKey : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders"+"/"+orderKey+".json");
  }

  public getProcessedShopOrders(date:string) : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/ProcessedShopOrders/"+date+".json");
  }

  public getChefs() : Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/chefs.json');
  }

  public deleteChef(chefKey : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/chefs/"+chefKey+".json");
  }

  public addChef(chef:{chefName : string , manages : string , password : string}) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/chefs.json' , chef);
  }

  public setBaseForChefNotificationToken(chef : {chefName : string , manages : string , password : string}) : Observable<any>
  {
    return this.http.patch("https://muskan-admin-app-default-rtdb.firebaseio.com/chefNotificationTokens/"+chef.chefName.toUpperCase()+".json",{chefToken : "TEST-TOKEN-FROM-ADMIN-APP"});
  }

  public deleteChefNotificationToken(chefName : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/chefNotificationTokens/"+chefName+".json");
  }

  public sendNotificationToChefs(regIds : string[],type : string = "normal") : Observable<any>
  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA1CskWfc:APA91bELCsy-GM2n8hPD3Sc4vaanR3ymcIP8mttKC5rhfg9nU4eDVcxcKOxOICxx5B6zdnGce4bBvPfzOB_NzMUg3iT_hHRQbhIyfTAduQxkkVOYTx0hQd0S1GJaPbmtmJrIKdb4_X1f' });
  let options = { headers: headers };
  let title = type === "custom" ? "NEW CUSTOM ORDER" : "NEW ORDER";
  let body = {
    "registration_ids": regIds,
    "notification": {
        "body": "Click to check out",
        "title": title,
        "android_channel_id": "chefnotifications",
        "sound": false
    }
}
return this.http.post("https://fcm.googleapis.com/fcm/send" , body , options);
  }

public getAllChefNotificationTokens() : Observable<any>
{
  return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/chefNotificationTokens.json");
}

  public addFlavour(flavour : {flavourName : string , shopPrice : number , customerPrice : number}):Observable<any>
  {
    flavour.shopPrice = +flavour.shopPrice;
    flavour.customerPrice = +flavour.customerPrice;
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeFlavours.json" , flavour);
  }

  public getFlavours() : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeFlavours.json");
  }

  public deleteFlavour(flavourKey:string):Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeFlavours/"+flavourKey+".json");
  }

  public editFlavour(flavour:{flavourName : string , shopPrice : number,customerPrice : number} , flavourKey:string) : Observable<any>
  {
    flavour.shopPrice = +flavour.shopPrice;
    flavour.customerPrice = +flavour.customerPrice;
    return this.http.patch("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeFlavours/"+flavourKey+".json",flavour);
  }

  public getDesignCategories():Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeDesignCategories.json");
  }

  public deleteDesign(designKey : string) : Observable<any>
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeDesignCategories/"+designKey+".json");
  }

  public addDesign(design : {designName : string , shopPrice : number , customerPrice : number}):Observable<any>
  {
    design.customerPrice = +design.customerPrice;
    design.shopPrice = +design.shopPrice;
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeDesignCategories.json" , design);
  }

  public editDesign(design:{designName : string , shopPrice : number,customerPrice : number} , designKey:string) : Observable<any>
  {
    design.customerPrice = +design.customerPrice;
    design.shopPrice = +design.shopPrice;
    return this.http.patch("https://muskan-admin-app-default-rtdb.firebaseio.com/cakeDesignCategories/"+designKey+".json",design);
  }

  public deleteSubcategoryOfCategory(categoryKey : string , subcategoryKey : string)
  {
    return this.http.delete("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+"/Subcategories/"+subcategoryKey+".json");
  }

  public editSubcategoryOfCategory(categoryKey : string , subcategoryKey : string , newName : string)  : Observable<any>
  {
    return this.http.patch("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+"/Subcategories/"+subcategoryKey+".json" , {'subcategoryName' : newName});
  }

  public sendCustomOrderToChef(orderInformation:any , orderDate : string) : Observable<any>
  {
    return this.http.post("https://muskan-admin-app-default-rtdb.firebaseio.com/processedShopCustomOrders/"+orderDate+".json" , orderInformation);
  }

  public isCategoryForDistributor(categoryKey : string) : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/Categories/"+categoryKey+"/forDistributor.json");
  }

  public addDistributorship(distributorship:{distributorship : string}) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/Distributorships.json' , distributorship);
  }

  public getDistributorships() : Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/Distributorships.json');
  }

  public deleteDistributorship(distributorshipKey) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/Distributorships/'+distributorshipKey+".json");
  }

  public approveDistributorNotification(notificationKey : string , notificationData : any) : Observable<any>
  {
    return this.http.post('https://muskan-admin-app-default-rtdb.firebaseio.com/Distributors.json' , notificationData);
  }

  public getActiveOrdersForDistributors() : Observable<any>
  {
    return this.http.get("https://muskan-admin-app-default-rtdb.firebaseio.com/activeDistributorOrders.json");
  }

  public getActiveDistributorOrdersCount():Observable<any>
  {
    return this.http.get('https://muskan-admin-app-default-rtdb.firebaseio.com/activeDistributorOrders.json?shallow=true');
  }

  public uploadOnlyCategory(catKey : string , catData : any) : Observable<any>
  {
    return this.http.put('https://muskan-admin-app-default-rtdb.firebaseio.com/onlyCategories/'+catKey+'.json' , catData);
  }

  public deleteAllDirtyOrders(dirtyOrderKeys) : Observable<any>
  {
    // return Observable.create((observer)=>{
    //   for(let i=0;i<dirtyOrderKeys.length;i++)
    //   {
    //     this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/'+dirtyOrderKeys[i]+'/.json').subscribe((_)=>{
    //       observer.next('Completed deleting '+dirtyOrderKeys[i]);
    //     });
    //   }
    //   observer.Completed('Compeleted Deleting');
    // });
    const requests = dirtyOrderKeys
      .map(requestId => this.deleteOrder(requestId));
    return forkJoin(
      ...requests
    );
  }

  private deleteOrder(key) : Observable<any>
  {
    return this.http.delete('https://muskan-admin-app-default-rtdb.firebaseio.com/activeShopOrders/'+key+'/.json');
  }

}
