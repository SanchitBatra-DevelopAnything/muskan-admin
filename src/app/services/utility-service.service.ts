import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  loggedInStatusUpdated : Subject<boolean>;
  categoryDeleted:Subject<string>;
  retailerNotificationDeleted:Subject<string>;
  refreshRetailerNotificationCount:Subject<string>;
  itemDeleted:Subject<string>;
  itemUpdated:Subject<string>;

  categories : String[];

  constructor() { 
    this.loggedInStatusUpdated = new Subject<boolean>();
    this.categoryDeleted = new Subject<string>();
    this.retailerNotificationDeleted = new Subject<string>();
    this.refreshRetailerNotificationCount = new Subject<string>();
    this.itemDeleted = new Subject<string>();
    this.itemUpdated = new Subject<string>();
    this.categories = [];
  }

  uploadCategories(allPresentCategories : String[])
  {
    this.categories = [...allPresentCategories];
  }

}
