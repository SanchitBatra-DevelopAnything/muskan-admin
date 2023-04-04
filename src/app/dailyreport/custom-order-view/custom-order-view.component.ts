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

  pounds:any;
  flavour:any;

  constructor(private route : ActivatedRoute , private router : Router , private apiService : ApiserviceService , private toastr : ToastrService , private notificationService : NotificationManagerService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderType = this.route.snapshot.params['orderType'];
    this.getOrderDetails();
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
      }
      this.orderData = orderDetail;
      this.orderImgUrl = this.orderData['imgUrl'];
      this.orderImgUrl2 = this.orderData['photoOnCakeUrl'];
      console.log("hello"+this.orderImgUrl2);
      this.orderDescription = this.orderData['cakeDescription'];
      this.orderDate = this.orderData['orderDate'];
      this.pounds = this.orderData['pounds'];
      this.flavour = this.orderData['flavour'];
      this.isLoading = false;
    });
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
     console.log("STARTING NOTIS");
     const deviceToken = this.notificationService.findParticularToken(orderInformation['orderedBy']);
    this.apiService.sendNotificationToParticularDevice("Check details in my orders","CUSTOM ORDER ACCEPTED!",deviceToken).subscribe((_)=>{
      console.log("SENT NOTIFICATION");
      this.toastr.success('Sent notification successfull!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
    });
     
  }

}
