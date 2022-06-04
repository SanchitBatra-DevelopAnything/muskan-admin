import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-shop-form',
  templateUrl: './add-shop-form.component.html',
  styleUrls: ['./add-shop-form.component.css']
})
export class AddShopFormComponent implements OnInit {


  addShopForm : FormGroup;
  areas : {id : number , area : string}[];
  isInsertingShop:boolean;

  constructor(private apiService : ApiserviceService , private router : Router , private toastr:ToastrService) { }

  ngOnInit(): void {

    this.areas = [{id : 1 , area : "Ghaziabad"} , {id : 2 , area : "Noida"} , {id : 3 , area : "Dadri"} , {id : 4 , area : "RK PURAM"}]; 
    this.isInsertingShop = false;
    this.addShopForm = new FormGroup({
      'shopName' : new FormControl(null , [Validators.required]), 
      'areaName' : new FormControl(null , [Validators.required])
    });
  }

  onSubmit()
  {
    this.isInsertingShop = true;
    this.addShopForm.patchValue({
      shopName : this.addShopForm.value.shopName.toUpperCase(),
      areaName : this.addShopForm.value.areaName,
    })
    this.apiService.addShop(this.addShopForm.value).subscribe((_)=>{
      this.isInsertingShop = false;
      this.toastr.success('Shop Added Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.addShopForm.reset();
    }) , (err)=>{
      this.isInsertingShop = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }

}
