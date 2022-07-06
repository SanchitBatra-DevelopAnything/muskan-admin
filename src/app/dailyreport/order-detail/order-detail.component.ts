import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UtilityServiceService } from 'src/app/services/utility-service.service';

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
  orderType : string;

  displayedColumns: string[] = ['Sno', 'Item', 'Quantity', 'Price'];
  dataSource:any;
  categoriesInBillValues:any;
  categoriesToShow:any;
  hideHeaders:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route : ActivatedRoute , private router : Router,private apiService : ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderType = this.route.snapshot.params['orderType'];
    this.getOrderItems();
  }

  goBackToOrders()
  {
    this.router.navigate(['/dailyReport']);
  }

  getOrderItems()
  {
    this.isLoading = true;
    this.apiService.getOrder("3052022",this.orderKey , this.orderType).subscribe((orderDetail)=>{
      if(orderDetail == null)
      {
        this.orderData = {};
        this.isLoading = false;
        this.categoriesInBillValues = [];
        this.billData = [];
        return;
      }
      this.orderData = orderDetail;
      this.getCategoriesInBill();
      this.formBillData();
      this.isLoading = false;
    });
  }

  getCategoriesInBill()
  {
    this.categoriesInBillValues = [];
    this.categoriesToShow = [{category : "ALL"}];
    let items = this.orderData['items'];
    for(let i=0;i<items.length;i++)
    {
      let item = items[i];
      this.categoriesInBillValues.push(item.CategoryName);
    }
    let arr = this.categoriesInBillValues.filter((v, i, a) => a.indexOf(v) === i); //unique.
    arr.forEach(element => {
      this.categoriesToShow.push({category : element});
    });
  }

  formBillData()
  {
    this.hideHeaders = false;
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

  getCategoryWiseBill(cat : {category : string})
  {
    if(cat.category=="ALL")
    {
      this.formBillData();
      return;
    }
    this.hideHeaders = true;
    let items = this.orderData['items'];
    this.billData = [];
    for(let i=0;i<items.length;i++)
    {
      let item = items[i].item;
      let data = {"Sno" : i+1 , "Item" : item , "Quantity" : items[i].quantity , "Price" : items[i].price};
      if(items[i].CategoryName.toString().toUpperCase() == cat.category.toString().toUpperCase())
      {
        this.billData.push(data); 
      }
    }
    this.dataSource = new MatTableDataSource<BillElement>(this.billData);
    this.setPaginator();
  }

  setPaginator()
  {
    this.dataSource.paginator = this.paginator;
  }

  sendOrderToChef()
  {
    this.isLoading = true;
    let orderInformation = {...this.orderData};
    let modifiedItemList = [];
    for(let i=0;i<orderInformation['items'].length;i++)
    {
      let item = orderInformation['items'][i];
      item['status'] = 'Being Prepared';
      item['yetToPrepare']  = item['quantity'];
      modifiedItemList.push(item);
    }
    orderInformation['items'] = modifiedItemList;
    orderInformation['orderKey'] = this.orderKey;
    
    console.log( " Going to Chef = ",orderInformation);
    this.apiService.makeOrderForChef(orderInformation , this.orderDate).subscribe((_)=>{
      this.apiService.deleteActiveOrder(this.orderKey).subscribe((_)=>{
        this.toastr.success('Order Given To Chefs Successfully', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
        this.router.navigate(['/dailyReport']);
        this.isLoading = false;
      });
    });
    console.log("STARTING CHEF NOTIS");
    this.apiService.getAllChefNotificationTokens().subscribe((tokens)=>{
      var regIds = [];
      if(tokens!=null)
      {
        regIds = Object.values(tokens);
        var onlyTokens = regIds.map((chefToken)=>{
          return chefToken.chefToken;
        })
      }
      this.apiService.sendNotificationToChefs(onlyTokens).subscribe((_)=>{
        this.toastr.success('Sent notifications to chefs', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
      });
      console.log("SENT NOTIS COMPLETE");
    });
  }

}

export interface BillElement {
  'Item': string;
  'Sno': number;
  'Quantity': number;
  'Price': string;
}