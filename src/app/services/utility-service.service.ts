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

  constructor() { 
    this.loggedInStatusUpdated = new Subject<boolean>();
    this.categoryDeleted = new Subject<string>();
    this.retailerNotificationDeleted = new Subject<string>();
    this.refreshRetailerNotificationCount = new Subject<string>();
    this.itemDeleted = new Subject<string>();
  }

}
