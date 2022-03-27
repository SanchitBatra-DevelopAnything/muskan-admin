import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{


  orderKey : string;
  orderDate:string;
  isLoading : boolean = false;
  orderData : {};
  billData : BillElement[];

  displayedColumns: string[] = ['Sno', 'Item', 'Quantity', 'Price'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route : ActivatedRoute , private router : Router,private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderDate = this.route.snapshot.params['orderDate'];
    this.getOrderItems();
  }

  goBackToOrders()
  {
    this.router.navigate(['/dailyReport']);
  }

  getOrderItems()
  {
    this.isLoading = true;
    this.apiService.getOrder(this.orderDate , this.orderKey).subscribe((orderDetail)=>{
      if(orderDetail == null)
      {
        this.orderData = {};
        this.isLoading = false;
        this.billData = [];
        return;
      }
      this.orderData = orderDetail;
      this.formBillData();
      this.isLoading = false;
    });
  }

  formBillData()
  {
    let items = this.orderData['items'];
    this.billData = [];
    for(let i=0;i<items.length;i++)
    {
      let item = items[i].item;
      if(items[i].weight!=undefined)
      {
        item = item + "-" + items[i].weight;
      }
      let data = {"Sno" : i+1 , "Item" : item , "Quantity" : items[i].quantity , "Price" : items[i].price};
      this.billData.push(data); 
    }
    this.dataSource = new MatTableDataSource<BillElement>(this.billData);
    this.setPaginator();
  }

  setPaginator()
  {
    this.dataSource.paginator = this.paginator;
  }

}

export interface BillElement {
  'Item': string;
  'Sno': number;
  'Quantity': number;
  'Price': string;
}