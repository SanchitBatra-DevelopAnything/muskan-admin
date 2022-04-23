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
  parentCategoryName: any; // to diffrentiate UI for cakes.

  @Input()
  parentCategoryKey:any; //dv in case of direct variety.

  isDeleting : boolean;
  isBeingUpdated : boolean;

  isEditMode:boolean;

  editItemName : string;
  editItemOffer : any;
  editItemShopPrice:any;
  editItemCustomerPrice:any;
  editDesignCategory:any;
  editFlavour:any;

  flavours:any;
  designs:any;
  flavoursForEditDropdown:any;
  designsForEditDropdown:any;

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isDeleting = false;
    this.isEditMode = false;
    this.isBeingUpdated = false;

    this.flavours = [];
    this.designs = [];

    if(this.parentCategoryName === "CAKES & PASTRIES")
    {
      this.fetchFlavours();
      this.fetchDesigns();
    }
  }

  fetchFlavours()
  {
    this.apiService.getFlavours().subscribe((allFlavours)=>{
      if(allFlavours == null)
      {
        this.flavours = [];
        return;
      }
      this.flavours = Object.values(allFlavours);
      this.flavoursForEditDropdown = this.flavours.map(flavour=>{
        return flavour.flavourName;
      });
    });
  }

  fetchDesigns()
  {
    this.apiService.getDesignCategories().subscribe(allDesigns=>{
      if(allDesigns == null)
      {
        this.designs = [];
        return;
      }
      this.designs = Object.values(allDesigns);
      this.designsForEditDropdown = this.designs.map((design)=>{
        return design.designName;
      });
    });
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
  'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : this.item.imageUrl , 'cakeFlavour' : "not-valid" , 'designCategory' : "not-valid"};
    this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
      this.utilityService.itemUpdated.next(this.item.key);
      this.isEditMode = false;
      this.isBeingUpdated = false;
    });
  }

  updateCakeItem()
  {
    this.isBeingUpdated = true;
    this.updatePrices(this.editFlavour , this.editDesignCategory);
    let updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
    'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : this.item.imageUrl , 'cakeFlavour' : this.editFlavour , 'designCategory' : this.editDesignCategory};
    this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
      this.utilityService.itemUpdated.next(this.item.key);
      this.isEditMode = false;
      this.isBeingUpdated = false;
    });
  }

  updatePrices(flavour , design)
  {
    console.log("RECEIVED REQUEST FOR",flavour,design);
    let flavourShopPrice = 0;
    let flavourCustomerPrice = 0;
    let designShopPrice = 0;
    let designCustomerPrice= 0;
    if(flavour === "ALL FLAVOURS")
    {
      flavour = "pineapple";
    }

    for(let i=0;i<this.flavours.length;i++)
    {
      if(this.flavours[i].flavourName.toLowerCase() === flavour.toLowerCase())
      {
        flavourShopPrice = this.flavours[i].shopPrice;
        flavourCustomerPrice = this.flavours[i].customerPrice;
        break;
      }
    }

    console.log("FLAVOUR PRICES ARE = ", flavourShopPrice , flavourCustomerPrice);

    for(let i=0;i<this.designs.length;i++)
    {
      if(this.designs[i].designName.toLowerCase() === design.toLowerCase())
      {
        console.log("MATCHED DESIGN");
        designShopPrice = this.designs[i].shopPrice;
        designCustomerPrice = this.designs[i].customerPrice;
        break;
      }
    }

    console.log("DESIGN PRICES ARE = ", designShopPrice , designCustomerPrice);

    this.editItemShopPrice = flavourShopPrice + designShopPrice;
    this.editItemCustomerPrice = flavourCustomerPrice + designCustomerPrice;
  }

}
