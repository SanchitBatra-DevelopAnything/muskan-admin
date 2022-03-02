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

  retailerNotifications : any;
  notificationKeys : any[];
  isLoading:boolean;
  retailerNotificationDeletedSub : Subscription;
  noMoreRetailerNotifications : boolean;

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.noMoreRetailerNotifications = false;
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
        this.isLoading = false;
        this.retailerNotifications = [];
        this.notificationKeys = [];
        return;
      }
      this.retailerNotifications = Object.values(notis);
      this.notificationKeys = Object.keys(notis);
      this.isLoading = false;
    });
  }

}
