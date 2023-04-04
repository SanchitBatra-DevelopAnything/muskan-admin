import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TotalParchiService } from 'src/app/services/dataSharing/total-parchi.service';
import { throws } from 'assert';
import { NotificationManagerService } from 'src/app/services/notifications/notification-manager.service';

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
  orderedBy : string;

  displayedColumns : string[];
  dataSource:any;
  categoriesInBillValues:any;
  categoriesToShow:any;
  hideHeaders:boolean = false;
  viewTotalParchi : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route : ActivatedRoute , private router : Router,private apiService : ApiserviceService , private toastr : ToastrService , private totalParchiService : TotalParchiService , private notificationService :NotificationManagerService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderType = this.route.snapshot.params['orderType'];
    this.orderDate = this.route.snapshot.params['orderDate'];
    this.orderedBy = this.route.snapshot.params['orderedBy'];
    this.displayedColumns = this.orderKey == "totalParchi" ? ['Sno' , 'Item' , 'Quantity'] : ['Sno', 'Item', 'Quantity', 'Price'];
    this.getOrderItems();
  }

  goBackToOrders()
  {
    if(this.orderedBy == "distributor")
    {
      this.router.navigate(['/dailyDistributorReport']); 
      return; //go to distributor orders.
    }
    this.router.navigate(['/dailyReport']);
  }

  getOrderItems()
  {
    if(this.orderKey == "totalParchi")
    {
      this.orderData = {'items' : this.totalParchiService.makeListFromMap()};
      this.getCategoriesInBill();
      this.formBillData();
      this.viewTotalParchi = true;
      return;
    }
    this.viewTotalParchi = false;
    this.isLoading = true;
    this.apiService.getOrder(this.orderDate,this.orderKey , this.orderType, this.orderedBy).subscribe((orderDetail)=>{
      if(orderDetail == null)
      {
        this.orderData = {};
        this.isLoading = false;
        this.categoriesInBillValues = [];
        this.billData = [];
        return;
      }
      this.orderData = orderDetail;
      this.orderDate = this.orderData['orderDate'];
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
    this.dataSource = this.viewTotalParchi ? new MatTableDataSource<TotalParchiBillElement>(this.billData) : new MatTableDataSource<BillElement>(this.billData);
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
      if(items[i].CategoryName.toString().toUpperCase() == cat.category.toString().toUpperCase() || (items[i].CategoryName.toString().toUpperCase() == "PASTRIES" && cat.category.toString().toUpperCase() == "CAKES & PASTRIES"))
      {
        this.billData.push(data); 
      }
    }
    this.dataSource = this.viewTotalParchi ? new MatTableDataSource<TotalParchiBillElement>(this.billData) : new MatTableDataSource<BillElement>(this.billData);
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
    this.apiService.makeOrderForChef(orderInformation , this.orderDate , this.orderedBy).subscribe((_)=>{
      this.apiService.deleteActiveOrder(this.orderKey , this.orderedBy).subscribe((_)=>{
        this.toastr.success('Order Given To Chefs Successfully', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
        if(this.orderedBy == "retailer")
        {
          this.router.navigate(['/dailyReport']);
        }
        else
        {
          this.router.navigate(['/dailyDistributorReport']);
        }
        
        this.isLoading = false;
      });
    });
    const deviceToken = this.notificationService.findParticularToken(orderInformation['orderedBy']);
    if(deviceToken == undefined || deviceToken == null)
    {
     //try again to load notification data , kyuki shayad app initial load pe app component ne nahi pick kiya ho.. ek aur try delo.
     this.apiService.getAllNotificationTokens().subscribe((allTokens)=>{
       const data = Object.values(allTokens);
       this.notificationService.setNotificationData(data);
     });
    }
    this.apiService.sendNotificationToParticularDevice("Check details in my orders.","REGULAR ORDER ACCEPTED!",deviceToken).subscribe((_)=>{
      console.log("SENT NOTIFICATION");
      this.toastr.success('Sent notification successfull!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
    });
  }

}

export interface BillElement {
  'Item': string;
  'Sno': number;
  'Quantity': number;
  'Price': string;
}

export interface TotalParchiBillElement {
  'Item' : string , 
  'Sno' : number , 
  'Quantity' : number
}