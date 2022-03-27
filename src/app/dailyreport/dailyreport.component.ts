import { Component, OnInit } from '@angular/core';
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


  constructor(private apiService : ApiserviceService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getActiveOrders("2732022").subscribe((orders)=>{
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

}
