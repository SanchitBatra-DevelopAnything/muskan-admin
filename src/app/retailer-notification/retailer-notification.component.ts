import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-retailer-notification',
  templateUrl: './retailer-notification.component.html',
  styleUrls: ['./retailer-notification.component.css']
})
export class RetailerNotificationComponent implements OnInit {

  @Input()
  notificationKey : string;

  isApproving : boolean;
  isDeleting : boolean;

  @Input()
  notificationData : {retailerName : string , shopAddress : string};

  constructor(private apiService : ApiserviceService,private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isDeleting = false;
    this.isApproving = false;
  }

  deleteNotification()
  {
    this.isDeleting = true;
    // setTimeout(() => {
    //   this.isDeleting = false;
    // }, (2000));

    this.apiService.deleteRetailerNotification(this.notificationKey).subscribe((_)=>{
      this.utilityService.retailerNotificationDeleted.next('Deleted');
      this.isDeleting = false;
    });

  }

  approveNotification()
  {
    this.isApproving = true;
    setTimeout(()=>{
      this.isApproving = false;
    },(2000));
  }

}
