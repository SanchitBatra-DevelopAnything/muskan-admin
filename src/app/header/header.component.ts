import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(private UtilityService : UtilityServiceService) { 
  }

  ngOnInit(): void {
    this.UtilityService.loggedInStatusUpdated.subscribe((loggedIn : boolean)=>{
      this.loggedIn = loggedIn;
    });
  }

  onLogout()
  {
    sessionStorage.clear();
    this.loggedIn = false;
  }

}
