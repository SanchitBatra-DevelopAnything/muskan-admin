import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-hours-face/ngx-material-timepicker-hours-face';
import { Subscription } from 'rxjs';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  loggedIn:boolean = false;
  private logInSub : Subscription;
  @Input()
  totalNotifications : number;

  @Input()
  totalRetailerOrders:number;

  @Input()
  totalDistributorOrders:number;

  adminType : string = "super-admin";
  isSuperAdmin:boolean = true;


  constructor(private UtilityService : UtilityServiceService) { 
  }

  ngOnInit(): void { 
    //in case the app reloads.
    if(sessionStorage.getItem('loggedIn'))
    {
      this.loggedIn = true;
    } 
    //change of login when user actually logs in.
    this.logInSub = this.UtilityService.loggedInStatusUpdated.subscribe((loggedIn : boolean)=>{
      this.loggedIn = loggedIn;
      this.adminType = sessionStorage.getItem('adminType');
      if(this.adminType=="worker")
      {
        this.isSuperAdmin = false;
      }
      else if(this.adminType == "super-admin")
      {
        this.isSuperAdmin = true;
      }
    });
  }

  onLogout()
  {
    sessionStorage.clear();
    this.loggedIn = false;
  }

  ngOnDestroy(){
    this.logInSub.unsubscribe();
  }

}
