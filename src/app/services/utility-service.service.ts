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

  chefNotificationServerKey:string;
  chefNotificationEndpointURL:string;

  constructor() { 
    this.loggedInStatusUpdated = new Subject<boolean>();
    this.categoryDeleted = new Subject<string>();
    this.retailerNotificationDeleted = new Subject<string>();
    this.refreshRetailerNotificationCount = new Subject<string>();
    this.itemDeleted = new Subject<string>();
    this.itemUpdated = new Subject<string>();

    this.chefNotificationServerKey = "AAAA1CskWfc:APA91bELCsy-GM2n8hPD3Sc4vaanR3ymcIP8mttKC5rhfg9nU4eDVcxcKOxOICxx5B6zdnGce4bBvPfzOB_NzMUg3iT_hHRQbhIyfTAduQxkkVOYTx0hQd0S1GJaPbmtmJrIKdb4_X1f";
    this.chefNotificationServerKey = "https://fcm.googleapis.com/fcm/send";
  }

}
