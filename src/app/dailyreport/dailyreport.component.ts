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


  constructor(private apiService : ApiserviceService , private router : Router) {

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

  showBill(orderKey)
  {
    this.router.navigate(['/orderBill/'+orderKey+'/2732022']);
  }

}
