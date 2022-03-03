import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-shop-form',
  templateUrl: './add-shop-form.component.html',
  styleUrls: ['./add-shop-form.component.css']
})
export class AddShopFormComponent implements OnInit {


  addShopForm : FormGroup;
  areas : {id : number , area : string}[];

  constructor() { }

  ngOnInit(): void {

    this.areas = [{id : 1 , area : "Ghaziabad"} , {id : 2, area : "Muradabad"}]; 

    this.addShopForm = new FormGroup({
      'shopName' : new FormControl(null), 
      'areaName' : new FormControl(null)
    });
  }

  onSubmit()
  {
    console.log(this.addShopForm.value);
  }

}
