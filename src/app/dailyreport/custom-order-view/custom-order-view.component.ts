import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  designData = {};
  photoData = [{'type' : "NO PHOTO" , 'price' : 0} , {'type' : "1/4 PHOTO" , 'price' : 150} , {'type' : "1/2 PHOTO" , 'price' : 220} , {'type' : "FULL PHOTO" , 'price' : 300}];
  selectedDesign:any;
  selectedPhotoOption:any = {'type' : "NO PHOTO" , 'price' : 0};
  flavourData = {};

  subTotal = 0;

  constructor(private route : ActivatedRoute , private router : Router , private apiService : ApiserviceService , private toastr : ToastrService , private notificationService : NotificationManagerService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderType = this.route.snapshot.params['orderType'];
    this.getOrderDetails();
    this.getFlavours();
    this.getDesignCategories();
    
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
      this.designData = [{'designName' : "Select Design"},...Object.values(designs)];
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
      this.orderImgUrl = this.orderData['imgUrl'];
      this.orderImgUrl2 = this.orderData['photoOnCakeUrl'];
      console.log("hello"+this.orderImgUrl2);
      this.orderDescription = this.orderData['cakeDescription'];
      this.orderDate = this.orderData['orderDate'];
      this.pounds = this.orderData['pounds'];
      this.flavour = this.orderData['flavour'];
      this.neededOnDate = this.formNeededDate(this.orderData['neededOnDate'].split(' ')[0]);
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
}
