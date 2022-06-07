import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/services/apiservice.service';

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

  constructor(private route : ActivatedRoute , private router : Router , private apiService : ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderKey = this.route.snapshot.params['orderKey'];
    this.orderDate = this.route.snapshot.params['orderDate'];
    this.orderType = this.route.snapshot.params['orderType'];
    this.getOrderDetails();
  }

  getOrderDetails()
  {
    this.apiService.getOrder(this.orderDate , this.orderKey , this.orderType).subscribe((orderDetail)=>{
      if(orderDetail == null)
      {
        this.orderData = {};
        this.isLoading = false;
        this.orderImgUrl = "";
        this.orderDescription = "NO ORDER FOUND WITH THIS KEY IN DB";
      }
      this.orderData = orderDetail;
      this.orderImgUrl = this.orderData['imgUrl'];
      this.orderDescription = this.orderData['cakeDescription'];
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
       this.apiService.deleteActiveOrder(this.orderKey , this.orderDate).subscribe((_)=>{
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
       this.apiService.sendNotificationToChefs(onlyTokens,"custom").subscribe((_)=>{
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
