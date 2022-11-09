import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  retailerNotifications : any[];
  notificationKeys : any[];
  distributorNotifications : any[];
  distributorNotificationKeys : any[];
  isLoading:boolean;
  retailerNotificationDeletedSub : Subscription;
  noMoreRetailerNotifications : boolean;
  noMoreDistributorNotifications:boolean;

  //notificationKeys is for retailerNotificationKeys.

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.noMoreRetailerNotifications = false;
    this.noMoreDistributorNotifications = false;
    this.utilityService.refreshRetailerNotificationCount.next('refresh');
    this.retailerNotificationDeletedSub = this.utilityService.retailerNotificationDeleted.subscribe((_)=>{
      this.getRetailerNotifications();
    });
    this.getRetailerNotifications();
  }

  getRetailerNotifications()
  {
    this.apiService.getRetailerNotifications().subscribe((notis)=>{
      if(notis === null)
      {
        this.noMoreRetailerNotifications = true;
        this.noMoreDistributorNotifications = true;
        this.isLoading = false;
        this.retailerNotifications = [];
        this.notificationKeys = [];
        return;
      }
      this.segregateNotifications(notis);
      this.isLoading = false;
    });
  }

  segregateNotifications(notis)
  {
    let allNotifications = Object.values(notis);
    let allNotificationKeys = Object.keys(notis);
    this.distributorNotifications = [];
    this.retailerNotifications = [];
    this.distributorNotificationKeys = [];
    this.notificationKeys = [];
    for(let i=0;i<allNotifications.length;i++)
    {
      let currentNotification = allNotifications[i];
      let currentNotificationKey = allNotificationKeys[i];
      if(currentNotification['distributorship']!=undefined && currentNotification['distributorship']!=null)
      {
        this.distributorNotifications.push(currentNotification);
        this.distributorNotificationKeys.push(currentNotificationKey);
      }
      else
      {
        this.retailerNotifications.push(currentNotification);
        this.notificationKeys.push(currentNotificationKey);
      }
    }
    if(this.retailerNotifications.length == 0)
    {
      this.noMoreRetailerNotifications = true;
    }
    if(this.distributorNotifications.length == 0)
    {
      this.noMoreDistributorNotifications = true;
    }
  }

}
