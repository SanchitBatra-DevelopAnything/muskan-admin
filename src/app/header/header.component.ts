import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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


  constructor(private UtilityService : UtilityServiceService) { 
  }

  ngOnInit(): void {
    this.logInSub = this.UtilityService.loggedInStatusUpdated.subscribe((loggedIn : boolean)=>{
      this.loggedIn = loggedIn;
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
