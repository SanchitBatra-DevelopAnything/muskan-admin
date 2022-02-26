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

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.retailerNotificationDeletedSub = this.utilityService.retailerNotificationDeleted.subscribe((_)=>{
      this.getRetailerNotifications();
    });
    this.getRetailerNotifications();
  }

  getRetailerNotifications()
  {
    this.apiService.getRetailerNotifications().subscribe((notis)=>{
      this.retailerNotifications = Object.values(notis);
      this.notificationKeys = Object.keys(notis);
      this.isLoading = false;
    });
  }

}
