import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilityServiceService } from 'src/app/services/utility-service.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefsData : any[];
  chefsKeys : any[];
  isLoading : boolean;

  constructor(private apiService : ApiserviceService , private router : Router , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.getChefs();
  }

  getChefs()
  {
    this.isLoading = true;
    this.apiService.getChefs().subscribe((chef)=>{
      if(chef == null)
      {
        this.chefsData = [];
        this.chefsKeys = [];
        this.isLoading = false;
        return;
      }
      this.chefsData = Object.values(chef);
      this.chefsKeys = Object.keys(chef);
      this.isLoading = false;
      this.printChefs(this.chefsData);
    });
  }

  printChefs(chefsData)
  {
    for(let i=0;i<chefsData.length;i++)
    {
      console.log(chefsData[i].chefName);
    }
  }

}
