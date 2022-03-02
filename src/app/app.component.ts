import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from './services/apiservice.service';
import { ImageService } from './services/image.service';
import { UtilityServiceService } from './services/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  // isLoggedIn:Boolean;
  totalNotifications:number;
  retailerNotificationDeletedSub : Subscription;
  refreshRetailerNotificationCountSub : Subscription;

  constructor(private apiService: ApiserviceService , private imageService : ImageService,private utilityService : UtilityServiceService) {

  }


  ngOnInit() {
    //this.isLoggedIn = false;
    this.imageService.initializeCategoriesWithImages(); //initialize the categories list.
    this.retailerNotificationDeletedSub = this.utilityService.retailerNotificationDeleted.subscribe((_)=>{
      this.getRetailerNotificationCount();
    });
    this.refreshRetailerNotificationCountSub = this.utilityService.refreshRetailerNotificationCount.subscribe((_)=>{
      this.getRetailerNotificationCount();
    });
    this.getRetailerNotificationCount();
  }

  // onAdminLogin(loginData : Boolean)
  // {
  //   this.isLoggedIn = true;
  // }

  getRetailerNotificationCount()
  {
    this.apiService.getNotificationCount().subscribe((shallowObject)=>{
      if(shallowObject === null)
      {
        this.totalNotifications = 0;
        return;
      }
      this.totalNotifications = Object.keys(shallowObject).length;
    });
  }

  ngOnDestroy()
  { 
    this.retailerNotificationDeletedSub.unsubscribe();
    this.retailerNotificationDeletedSub.unsubscribe();
  }


}
