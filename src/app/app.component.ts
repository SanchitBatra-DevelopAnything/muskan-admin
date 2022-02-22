import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './services/apiservice.service';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // isLoggedIn:Boolean;
  totalNotifications:number;

  constructor(private apiService: ApiserviceService , private imageService : ImageService) {

  }


  ngOnInit() {
    //this.isLoggedIn = false;
    this.imageService.initializeCategoriesWithImages(); //initialize the categories list.
    this.apiService.getNotificationCount().subscribe((shallowObject)=>{
      this.totalNotifications = Object.keys(shallowObject).length;
    });
  }

  // onAdminLogin(loginData : Boolean)
  // {
  //   this.isLoggedIn = true;
  // }


}
