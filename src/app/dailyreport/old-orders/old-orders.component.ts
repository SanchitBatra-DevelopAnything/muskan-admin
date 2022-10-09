import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { TotalParchiService } from 'src/app/services/dataSharing/total-parchi.service';

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
  fromTime:string = "";
  toTime:string = "";
  totalParchiOrders:any;
  timeError:boolean;

  constructor(private apiService : ApiserviceService , private router:Router , private totalParchiService : TotalParchiService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.processedOrders = [];
    this.processedOrderKeys = [];
    this.totalParchiOrders = [];
    this.timeError = false;
  }

  changeDate()
  {
    this.isLoading = true;
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
      this.isLoading = false;
    });
  }

  showBill(order , processedOrderKey)
  {
    let d = new Date(this.selected);
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let selectedDate = date+""+month+""+year;
    this.router.navigate(['/orderBill/'+order['orderKey']+"/processed?"+processedOrderKey+"/"+selectedDate]);
  }

  setFromTime(value)
  {
    this.fromTime = value.toString();
  }

  setToTime(value)
  {
    this.toTime = value.toString();
  }

  getTotalParchi()
  {
    console.log(this.fromTime , this.toTime);
    this.getRequiredOrders();
    this.totalParchiService.setAllItems(this.totalParchiOrders);
    this.totalParchiService.makeMap();
    //redirect.
    let d = new Date(this.selected);
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let selectedDate = date+""+month+""+year;
    if(!this.timeError)
    {
      this.router.navigate(['/orderBill/'+"totalParchi"+"/processed?"+"totalParchi"+"/"+selectedDate]);
    }
    
  }

  getRequiredOrders()
  {
    var startDate = Date.parse("01/01/2011 "+this.fromTime);
    var endDate = Date.parse("01/01/2011 "+this.toTime);

    console.log(startDate , endDate);
    if(startDate>endDate)
    {
      console.log("start big");
      this.timeError = true;
      //error on the UI , time error , start should be less to get proper time range.
      return;
    }
    else
    {
      this.timeError = false;
      this.isLoading = true;
      for(let i=0;i<this.processedOrders.length;i++)
      {
        if(this.orderTimeFilter(this.processedOrders[i].orderTime,startDate,endDate))
        {
          for(let j=0;j<this.processedOrders[i].items.length;j++)
          {
              if(this.processedOrders[i].items[j].item.toString().toLowerCase() == "veg patties")
              {
                console.log("VEG PATTIES FOUND : ", this.processedOrders[i].items[j].quantity , "Ordered by : " , this.processedOrders[i].shopAddress);
              }
              this.totalParchiOrders.push(this.processedOrders[i].items[j]);
          }
        }
      }
      console.log(this.totalParchiOrders);
      this.isLoading = false;
    }
  }

  orderTimeFilter(orderTime , startDate,endDate)
  {
    var orderTimeDate = Date.parse("01/01/2011 "+orderTime);
    if(orderTimeDate > startDate && orderTimeDate < endDate)
    {
      return true;
    }
    return false;
  }

}
