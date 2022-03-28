import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-old-orders',
  templateUrl: './old-orders.component.html',
  styleUrls: ['./old-orders.component.css']
})
export class OldOrdersComponent implements OnInit {

  selected : Date | null;
  processedOrders: any;
  processedOrderKeys : any;
  isLoading : boolean;

  constructor(private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.processedOrders = [];
    this.processedOrderKeys = [];
  }

  changeDate()
  {
    let date = this.selected.getDate();
    let month = this.selected.getMonth();
    let year = this.selected.getFullYear();
    let fullDate = date+""+(month+1)+""+year;
    this.apiService.getProcessedShopOrders(fullDate).subscribe((orders)=>{
      if(orders == null)
      {
        this.processedOrderKeys= [];
        this.processedOrders = [];
        this.isLoading = false;
        return;
      }
      this.processedOrders = Object.values(orders);
      this.processedOrderKeys = Object.keys(orders);
    });  
  }

}
