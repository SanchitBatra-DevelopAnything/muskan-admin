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

}
