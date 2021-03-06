import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throws } from 'assert';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css']
})
export class DailyreportComponent implements OnInit {

  activeOrders = [];
  activeOrderKeys = [];
  isLoading : boolean;
  todaysDate : string;


  constructor(private apiService : ApiserviceService , private router : Router) {

  }

  ngOnInit(): void {
    let istDate = this.getISTDate();
    let dateIST = istDate.getDate();
    let monthIST = istDate.getMonth() + 1;
    let yearIST = istDate.getFullYear();
    this.todaysDate = dateIST + "" + monthIST + "" + yearIST; 
    this.isLoading = true;
    this.apiService.getActiveOrders(this.todaysDate).subscribe((orders)=>{
      if(orders == null)
      {
        console.log(null);
        this.isLoading = false;
        this.activeOrderKeys = [];
        this.activeOrders = [];
        return;
      }
      this.activeOrders = Object.values(orders);
      this.activeOrderKeys = Object.keys(orders);
      this.isLoading = false;
    });
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
    this.router.navigate(['/orderBill/'+orderKey+"/"+this.todaysDate+"/active"]);
  }

  oldOrderPage()
  {
    this.router.navigate(['/processedOrders']);
  }

}
