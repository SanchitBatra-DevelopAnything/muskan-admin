import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-shop-form',
  templateUrl: './add-shop-form.component.html',
  styleUrls: ['./add-shop-form.component.css']
})
export class AddShopFormComponent implements OnInit {


  addShopForm : FormGroup;
  areas : {id : number , area : string}[];
  isInsertingShop:boolean;

  constructor(private apiService : ApiserviceService , private router : Router) { }

  ngOnInit(): void {

    this.areas = [{id : 1 , area : "Ghaziabad"} , {id : 2, area : "Muradabad"}]; 
    this.isInsertingShop = false;
    this.addShopForm = new FormGroup({
      'shopName' : new FormControl(null , [Validators.required]), 
      'areaName' : new FormControl(null , [Validators.required])
    });
  }

  onSubmit()
  {
    this.isInsertingShop = true;
    this.apiService.addShop(this.addShopForm.value).subscribe((_)=>{
      this.isInsertingShop = false;
      this.router.navigate(['/manage']);
    });
  }

}
