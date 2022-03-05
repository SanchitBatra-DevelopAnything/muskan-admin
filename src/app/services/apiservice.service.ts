import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
