import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css']
})
export class DailyreportComponent implements OnInit {

  activeOrders = [];
  activeOrderKeys = [];
  customOrders = [];
  customOrderKeys = [];
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
    this.apiService.getActiveOrders().subscribe((orders)=>{
      if(orders == null)
      {
        console.log(null);
        this.isLoading = false;
        this.activeOrderKeys = [];
        this.activeOrders = [];
        this.customOrderKeys = [];
        this.customOrders = [];
        return;
      }
      let temp_activeOrders = Object.values(orders);
      let temp_activeOrderKeys = Object.keys(orders);
      for(let i=0;i<temp_activeOrders.length;i++)
      {
        if(temp_activeOrders[i].orderType!=null  && temp_activeOrders[i].orderType.toLowerCase() === "custom")
        {
          this.customOrders.push(temp_activeOrders[i]);
          this.customOrderKeys.push(temp_activeOrderKeys[i]);
        }
        else
        {
          this.activeOrders.push(temp_activeOrders[i]);
          this.activeOrderKeys.push(temp_activeOrderKeys[i]);
        }
      }
      this.isLoading = false;
    });

    this.utilityService.refreshActiveOrdersCount.next('refresh');
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
    this.router.navigate(['/orderBill/'+orderKey+"/active"+"/NODATE/retailer"]);
  }

  openCustomOrder(orderKey)
  {
    console.log("Trying to open");
        this.router.navigate(['customOrder/'+orderKey+"/active"]);
  }

  oldOrderPage()
  {
    this.router.navigate(['/processedOrders']);
  }

}
