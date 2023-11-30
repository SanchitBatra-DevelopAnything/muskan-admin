import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContainerComponent } from 'src/app/container/container.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NotificationManagerService } from 'src/app/services/notifications/notification-manager.service';

@Component({
  selector: 'app-custom-order-view',
  templateUrl: './custom-order-view.component.html',
  styleUrls: ['./custom-order-view.component.css']
})
export class CustomOrderViewComponent implements OnInit {


  orderKey  :string;
  orderDate : string;
  isLoading : boolean = false;
  orderData : {};
  orderType : string;

  orderDescription : string = "";
  orderImgUrl : string = "";
  orderImgUrl2:string = "";
  neededOnDate:string ="NO DATA AVAILABLE";

  pounds:any;
  flavour:any;
  showAccept:boolean = false;
  designData :any= [{'designName':"Select Design" , 'shopPrice' : 0 , 'customerPrice' : 0}];
  photoData = [{'type' : "NO PHOTO" , 'price' : 0} , {'type' : "1/4 PHOTO" , 'price' : 120} , {'type' : "1/2 PHOTO" , 'price' : 200} , {'type' : "FULL PHOTO" , 'price' : 350}];
  selectedDesign:any = {'designName':"Select Design" , 'shopPrice' : 0 , 'customerPrice' : 0};
  selectedPhotoOption:any = {'type' : "NO PHOTO" , 'price' : 0};
  flavourData = {};

  subTotal = 0;

  constructor(private route : ActivatedRoute , private router : Router , private apiService : ApiserviceService , private toastr : ToastrService , private notificationService : NotificationManagerService , private dialog:MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderType = this.route.snapshot.params['orderType'];
    
    this.getFlavours();
    this.getDesignCategories();
    this.getOrderDetails();
    
  }

  getFlavours()
  {
    this.apiService.getFlavours().subscribe((flavours)=>{
      if(flavours == null)
      {
        this.flavourData = {};
        return;
      }
      let flavoursArray = Object.values(flavours);
      for(let i=0;i<flavoursArray.length;i++)
      {
        this.flavourData[flavoursArray[i]['flavourName']] = flavoursArray[i]['shopPrice'];
      }
    });
  }

  getDesignCategories()
  {
    this.apiService.getDesignCategories().subscribe((designs)=>{
      if(designs == null)
      {
        this.designData = {};
        this.isLoading = false;
        return;
      }
      this.designData = [...this.designData,...Object.values(designs)];
      console.log(this.designData);
      this.isLoading = false;
    });
  }

  calculatePrice(e:any)
  {
    console.log(e.value['designName'])
    if(this.selectedDesign['designName'] === "Select Design")
    {
      this.showAccept = false;
      this.subTotal = 0;
      return;
    }
    let price = 0;
    let pound = this.pounds;
    let designPrice = this.pounds * (this.selectedDesign.shopPrice);
    let flavourPrice = this.pounds * this.flavourData[this.flavour];
    let photoPrice = this.selectedPhotoOption.price;

    console.log("DESIGN PRICE = ",designPrice);
    console.log("FLAVOUR PRICE = ",flavourPrice);
    console.log("PHOTO PRICE  = ",photoPrice);
    price = flavourPrice + designPrice + photoPrice;

    this.subTotal = price;
    
    this.showAccept = true;
    let update_object = {'selectedDesign' : this.selectedDesign['designName'] , 'selectedPhotoOption' : this.selectedPhotoOption['type'] , 'totalAmount' : this.subTotal , 
  'photoPrice' : photoPrice , 'flavourPrice' : flavourPrice , 'designPrice' : designPrice , 'designCustomerPrice' : this.selectedDesign['customerPrice']};

    this.apiService.updateCustomOrder(this.orderKey , update_object).subscribe((_)=>{
      console.log("Order updated");
    });
    // localStorage.setItem('custom_order_key' , this.orderKey);
    // localStorage.setItem('custom_order_data' , JSON.stringify(update_object));
  }

  getOrderDetails()
  {
    this.apiService.getOrder("NO DATE CONCEPT FOR UNPROCESSED ORDERS" , this.orderKey , this.orderType,"retailer").subscribe((orderDetail)=>{
      if(orderDetail == null)
      {
        this.orderData = {};
        this.isLoading = false;
        this.orderImgUrl = "";
        this.pounds = "NOT-VALID";
        this.flavour = "NOT-VALID";
        this.orderImgUrl2 = "";
        this.orderDescription = "NO ORDER FOUND WITH THIS KEY IN DB";
        this.neededOnDate = "NO DATA AVAILABLE";
        return;
      }
      
      this.orderData = orderDetail;
      console.log(this.orderData);
      this.orderImgUrl = this.orderData['imgUrl'];
      this.orderImgUrl2 = this.orderData['photoOnCakeUrl'];
      console.log("hello"+this.orderImgUrl2);
      this.orderDescription = this.orderData['cakeDescription'];
      this.orderDate = this.orderData['orderDate'];
      this.pounds = this.orderData['pounds'];
      this.flavour = this.orderData['flavour'];
      this.neededOnDate = this.formNeededDate(this.orderData['neededOnDate'].split(' ')[0]);
      
        let actual_obj = this.orderData;
        this.subTotal = actual_obj['totalAmount'] == undefined ? 0 : actual_obj['totalAmount'];
        this.selectedPhotoOption =actual_obj['selectedPhotoOption'] == undefined ? {'type' : "NO PHOTO" , 'price' : 0} : {'type' : actual_obj['selectedPhotoOption'] , 'price' : actual_obj['photoPrice']};
        setTimeout((()=>{
          this.selectedDesign = actual_obj['selectedDesign'] == undefined ? {'designName':"Select Design" , 'shopPrice' : 0 , 'customerPrice' : 0} : {'designName' : actual_obj['selectedDesign'] , 'shopPrice' : actual_obj['designPrice']/this.pounds , 'customerPrice' : actual_obj['designCustomerPrice']};
          if(this.selectedDesign['designName']!="Select Design")
          {
            this.showAccept = true;
          }
        }),300);
        
        this.isLoading = false;
    });
  }

  formNeededDate(date)
  {
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];

    return day+"-"+month+"-"+year;
  }
  
  sendOrderToChef()
  {
    this.isLoading = true;
    let orderInformation = {...this.orderData};
    orderInformation['orderKey'] = this.orderKey;
    
    console.log( " Going to Chef = ",orderInformation);
     this.apiService.sendCustomOrderToChef(orderInformation , this.orderDate).subscribe((_)=>{
       this.apiService.deleteActiveOrder(this.orderKey,"retailer").subscribe((_)=>{
         this.toastr.success('Order Given To Chefs Successfully', 'Notification!' , {
           timeOut : 4000 ,
           closeButton : true , 
           positionClass : 'toast-bottom-right'
         });
         this.router.navigate(['/dailyReport']);
         this.isLoading = false;
       });
     });
     let deviceToken = "";
     this.apiService.findToken(orderInformation['orderedBy'],orderInformation['shopAddress']).subscribe((token)=>{
       deviceToken = token['token'];  
       this.apiService.sendNotificationToParticularDevice("Check details in my orders.","CUSTOM ORDER ACCEPTED!",deviceToken).subscribe((_)=>{
        console.log("SENT NOTIFICATION");
        this.toastr.success('Sent notification successfull!', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
      });
     });
    
     }

     openDialog()
     {
       let dialogRef = this.dialog.open(ContainerComponent , {data : {orderAccept : "Accepting Order Password Daaldo"}});
   
       dialogRef.afterClosed().subscribe((result)=>{
         if(result === "yes")
         {
           this.sendOrderToChef();
         }
       }); 
     }
}
