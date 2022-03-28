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
    let date = new Date();
    let utc = date.toUTCString();
    let istDate = new Date(utc);
    istDate.setHours(istDate.getHours() + 5);
    istDate.setMinutes(istDate.getMinutes() + 30);
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

  showBill(orderKey)
  {
    this.router.navigate(['/orderBill/'+orderKey+"/"+this.todaysDate]);
  }

  oldOrderPage()
  {
    this.router.navigate(['/processedOrders']);
  }

}
