import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './services/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // isLoggedIn:Boolean;
  totalNotifications:number;

  constructor(private apiService: ApiserviceService) {

  }


  ngOnInit() {
    //this.isLoggedIn = false;
    this.apiService.getNotificationCount().subscribe((shallowObject)=>{
      this.totalNotifications = Object.keys(shallowObject).length;
    });
  }

  // onAdminLogin(loginData : Boolean)
  // {
  //   this.isLoggedIn = true;
  // }


}
