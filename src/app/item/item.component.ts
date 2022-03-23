import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item : any; //comes with a key.

  @Input()
  parentSubcategoryKey : any;

  @Input()
  parentCategoryKey:any; //dv in case of direct variety.

  isDeleting : boolean;
  isBeingUpdated : boolean;

  isEditMode:boolean;

  editItemName : string;
  editItemOffer : any;
  editItemShopPrice:any;
  editItemCustomerPrice:any;

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isDeleting = false;
    this.isEditMode = false;
    this.isBeingUpdated = false;
  }

  deleteItem()
  {
    this.isDeleting = true;
    this.apiService.deleteItem(this.parentCategoryKey , this.parentSubcategoryKey , this.item.key).subscribe((_)=>{
      this.utilityService.itemDeleted.next(this.item.key);
      this.isDeleting = false;
    });
  }

  editItem()
  {
    this.isEditMode = true;
    this.editItemName = this.item.itemName.toUpperCase();
    this.editItemOffer = this.item.offer
    this.editItemCustomerPrice = this.item.customerPrice;
    this.editItemShopPrice = this.item.shopPrice;
  }

  updateItem()
  {
    this.isBeingUpdated = true;
    let updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
  'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : this.item.imageUrl};
    this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
      this.utilityService.itemUpdated.next(this.item.key);
      this.isEditMode = false;
      this.isBeingUpdated = false;
    });
  }

}
