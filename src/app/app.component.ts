import { Component, OnDestroy, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { ApiserviceService } from './services/apiservice.service';
import { ImageService } from './services/image.service';
import { NotificationManagerService } from './services/notifications/notification-manager.service';
import { UtilityServiceService } from './services/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class AppComponent implements OnInit , OnDestroy {
  // isLoggedIn:Boolean;
  totalNotifications:number;
  retailerNotificationDeletedSub : Subscription;
  refreshRetailerNotificationCountSub : Subscription;

  totalRetailerOrders:number;
  totalDistributorOrders : number;
  refreshActiveOrdersCountSub:Subscription;
  refreshDistributorActiveOrdersCountSub:Subscription;

  constructor(private apiService: ApiserviceService , private imageService : ImageService,private utilityService : UtilityServiceService , private notificationService : NotificationManagerService) {

  }


  ngOnInit() {
    //this.isLoggedIn = false;
    this.imageService.initializeCategoriesWithImages(); //initialize the categories list.
    // this.imageService.initializeItemsWithImages(); //initialize items under categories and subcategories.
    this.retailerNotificationDeletedSub = this.utilityService.retailerNotificationDeleted.subscribe((_)=>{
      this.getRetailerNotificationCount();
    });
    this.refreshRetailerNotificationCountSub = this.utilityService.refreshRetailerNotificationCount.subscribe((_)=>{
      this.getRetailerNotificationCount();
    });

    this.getRetailerNotificationCount();
    this.refreshActiveOrdersCountSub = this.utilityService.refreshActiveOrdersCount.subscribe((_)=>{
      this.getActiveOrdersCount();
    });
    this.getActiveOrdersCount();

    this.refreshDistributorActiveOrdersCountSub = this.utilityService.refreshDistributorActiveOrdersCount.subscribe((_)=>{
      this.getDistributorActiveOrdersCount();
    });
    this.getDistributorActiveOrdersCount();

    //load all notification tokens to notification service. This is used to send a particular notification to a particular device , example order accepted etc.
    //app initial load par saare tokens aagaye aur set hogaye , ab kahin bhi required retailer ka token use krke notification bhejdo.
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

  getActiveOrdersCount()
  {
    this.apiService.getActiveOrdersCount().subscribe((shallowObject)=>{
      if(shallowObject === null)
      {
        this.totalRetailerOrders = 0;
        return;
      }
      this.totalRetailerOrders = Object.keys(shallowObject).length;
    });
  }

  getDistributorActiveOrdersCount()
  {
    this.apiService.getActiveDistributorOrdersCount().subscribe((shallowObject)=>{
      if(shallowObject === null)
      {
        this.totalDistributorOrders = 0;
        return;
      }
      this.totalDistributorOrders = Object.keys(shallowObject).length;
    });
  }

  ngOnDestroy()
  { 
    this.retailerNotificationDeletedSub.unsubscribe();
    this.refreshRetailerNotificationCountSub.unsubscribe();
    this.refreshActiveOrdersCountSub.unsubscribe();
    this.refreshDistributorActiveOrdersCountSub.unsubscribe();
  }


}
