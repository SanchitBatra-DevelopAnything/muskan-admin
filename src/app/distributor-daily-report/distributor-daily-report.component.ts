import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-distributor-daily-report',
  templateUrl: './distributor-daily-report.component.html',
  styleUrls: ['./distributor-daily-report.component.css']
})
export class DistributorDailyReportComponent implements OnInit {

  activeDistributorOrders = [];
  activeDistributorOrderKeys = [];
  isLoading : boolean;
  todaysDate : string;


  constructor(private apiService : ApiserviceService , private router : Router , private utilityService:UtilityServiceService) {

  }

  ngOnInit(): void {
    let istDate = this.getISTDate();
    let dateIST = istDate.getDate();
    let monthIST = istDate.getMonth() + 1;
    let yearIST = istDate.getFullYear();
    this.todaysDate = dateIST + "" + monthIST + "" + yearIST; 
    this.isLoading = true;
    this.apiService.getActiveOrdersForDistributors().subscribe((orders)=>{
      if(orders == null)
      {
        console.log(null);
        this.isLoading = false;
        this.activeDistributorOrderKeys = [];
        this.activeDistributorOrders = [];
        return;
      }
      this.activeDistributorOrders = Object.values(orders);
      this.activeDistributorOrderKeys = Object.keys(orders);
      this.isLoading = false;
    });

    this.utilityService.refreshDistributorActiveOrdersCount.next('refresh');
  }

  getISTDate() : Date
  {
    let date = new Date();
    date.setDate(date.getUTCDate());
    date.setMonth(date.getUTCMonth());
    date.setFullYear(date.getUTCFullYear());
    date.setHours(date.getUTCHours());
    date.setMinutes(date.getUTCMinutes());
    date.setSeconds(date.getUTCSeconds());
    date.setMilliseconds(date.getUTCMilliseconds());

    let utcDate = date;
    utcDate.setHours(utcDate.getHours() + 5);
    utcDate.setMinutes(utcDate.getMinutes() + 30);

    return utcDate;
  }

  showBill(orderKey)
  {
    this.router.navigate(['/orderBill/'+orderKey+"/active"+"/NODATE/distributor"]);
  }


  oldOrderPage()
  {
    this.router.navigate(['/processedOrders/distributor']);
  }


}
