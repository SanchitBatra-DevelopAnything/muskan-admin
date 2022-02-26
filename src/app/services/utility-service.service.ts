import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  loggedInStatusUpdated : Subject<boolean>;
  categoryDeleted:Subject<string>;
  retailerNotificationDeleted:Subject<string>;

  constructor() { 
    this.loggedInStatusUpdated = new Subject<boolean>();
    this.categoryDeleted = new Subject<string>();
    this.retailerNotificationDeleted = new Subject<string>();
  }

}
