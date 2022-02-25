import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  retailerNotifications : any;
  notificationKeys : any[];
  isLoading:boolean;

  constructor(private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getRetailerNotifications().subscribe((notis)=>{
      // console.log("Noti " , notis);
      this.retailerNotifications = Object.values(notis);
      this.notificationKeys = Object.keys(notis);
      this.isLoading = false;
      // console.log("Data" , this.retailerNotifications);
      // console.log("keys" , this.notificationKeys);
    });
  }

}
