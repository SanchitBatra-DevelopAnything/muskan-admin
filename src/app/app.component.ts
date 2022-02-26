import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from './services/apiservice.service';
import { ImageService } from './services/image.service';
import { UtilityServiceService } from './services/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // isLoggedIn:Boolean;
  totalNotifications:number;
  retailerNotificationDeletedSub : Subscription;

  constructor(private apiService: ApiserviceService , private imageService : ImageService,private utilityService : UtilityServiceService) {

  }


  ngOnInit() {
    //this.isLoggedIn = false;
    this.imageService.initializeCategoriesWithImages(); //initialize the categories list.
    this.retailerNotificationDeletedSub = this.utilityService.retailerNotificationDeleted.subscribe((_)=>{
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
      this.totalNotifications = Object.keys(shallowObject).length;
    });
  }


}
