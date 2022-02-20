import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn:Boolean;


  ngOnInit() {
    this.isLoggedIn = false;
  }

  onAdminLogin(loginData : Boolean)
  {
    this.isLoggedIn = true;
  }


}
