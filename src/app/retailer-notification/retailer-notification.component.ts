import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retailer-notification',
  templateUrl: './retailer-notification.component.html',
  styleUrls: ['./retailer-notification.component.css']
})
export class RetailerNotificationComponent implements OnInit {

  @Input()
  notificationKey : string;

  @Input()
  notificationData : {retailerName : string , shopAddress : string};

  constructor() { }

  ngOnInit(): void {
  }

}
