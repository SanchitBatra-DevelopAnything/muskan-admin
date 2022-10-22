import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
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
  parentSubcategoryKey : any; //dv in case of direct variety.

  @Input()
  parentCategoryName: any; // to diffrentiate UI for cakes.

  @Input()
  parentCategoryKey:any; 

  @Input()
  forDistributor:any;

  isDeleting : boolean;
  isBeingUpdated : boolean;

  isEditMode:boolean;

  editItemName : string;
  editItemOffer : any;
  editItemShopPrice:any;
  editItemCustomerPrice:any;
  editDesignCategory:any;
  editFlavour:any;
  editItemImgUrl:string;
  editDistributorItemName:any;
  editDistributorPrice:any;

  selectedImageForEdit:any;
  imgEditSrc:string;

  @Input()
  flavours:any;
  @Input()
  designs:any;
  @Input()
  flavoursForEditDropdown:any;
  @Input()
  designsForEditDropdown:any;

  constructor(private storage : AngularFireStorage,private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isDeleting = false;
    this.isEditMode = false;
    this.isBeingUpdated = false;
    console.log(this.forDistributor);

    // if(this.parentCategoryName === "CAKES & PASTRIES")
    // {
    //   this.fetchFlavours();
    //   this.fetchDesigns();
    // }
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
    this.editFlavour = this.item.cakeFlavour;
    this.editItemImgUrl = this.item.imageUrl;
    this.imgEditSrc = this.item.imageUrl;
    this.editDesignCategory = this.item.designCategory;
    if(this.forDistributor)
    {
      this.editDistributorItemName = this.item.editDistributorItemName;
      this.editDistributorPrice = this.item.distributorPrice;
    }
  }

  showPreview(event : any)
  {
    if(event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = (e:any)=>{
        this.imgEditSrc = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageForEdit = event.target.files[0];
    }
    //if someone clicks cancel
    else {
      this.imgEditSrc = this.editItemImgUrl;
      this.selectedImageForEdit = null;
    }
  }

  updateItem()
  {
    this.isBeingUpdated = true;
    let updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
    'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : this.item.imageUrl , 'cakeFlavour' : "not-valid" , 'designCategory' : "not-valid"};
    if(this.forDistributor)
    {
     updatedItem["distributorPrice"] = this.editDistributorPrice;
     updatedItem["distributorItemName"] = this.editDistributorItemName;
    }
    if(this.item.imageUrl!=this.imgEditSrc) //means image change occured.
    {
      
      var filePath = `items/${this.selectedImageForEdit.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImageForEdit).snapshotChanges().pipe(
        finalize(()=>{
          //RETRIEVING THE UPLOADED IMAGE URL.
          fileRef.getDownloadURL().subscribe((url)=>{
            updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
            'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : url , 'cakeFlavour' : "not-valid" , 'designCategory' : "not-valid"};
            
            this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
              this.utilityService.itemUpdated.next(this.item.key);
              this.isEditMode = false;
              this.isBeingUpdated = false;
            });
          });
        })
      ).subscribe();
    }
    else
    {
      this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
        this.utilityService.itemUpdated.next(this.item.key);
        this.isEditMode = false;
        this.isBeingUpdated = false;
      });
    }
  }

  updateCakeItem()
  {
    this.isBeingUpdated = true;
    this.updatePrices(this.editFlavour , this.editDesignCategory);
    let updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
    'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : this.item.imageUrl , 'cakeFlavour' : this.editFlavour , 'designCategory' : this.editDesignCategory};

    if(this.forDistributor)
    {
     updatedItem["distributorPrice"] = this.editDistributorPrice;
     updatedItem["distributorItemName"] = this.editDistributorItemName;
    }

    if(this.item.imageUrl!=this.imgEditSrc) //means image change occured.
    {
      
      var filePath = `items/${this.selectedImageForEdit.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImageForEdit).snapshotChanges().pipe(
        finalize(()=>{
          //RETRIEVING THE UPLOADED IMAGE URL.
          fileRef.getDownloadURL().subscribe((url)=>{
            updatedItem = {'itemName' : this.editItemName , 'offer' : this.editItemOffer , 'shopPrice' : this.editItemShopPrice , 
            'customerPrice' : this.editItemCustomerPrice , 'imageUrl' : url , 'cakeFlavour' : this.editFlavour , 'designCategory' : this.editDesignCategory};
            
            this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
              this.utilityService.itemUpdated.next(this.item.key);
              this.isEditMode = false;
              this.isBeingUpdated = false;
            });
          });
        })
      ).subscribe();
    }
    else
    {
      this.apiService.editItem(this.item.key , this.parentSubcategoryKey , this.parentCategoryKey , updatedItem).subscribe((_)=>{
        this.utilityService.itemUpdated.next(this.item.key);
        this.isEditMode = false;
        this.isBeingUpdated = false;
      });
    }


   
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

    this.editItemShopPrice = +flavourShopPrice + +designShopPrice;
    this.editItemCustomerPrice = +flavourCustomerPrice + +designCustomerPrice;
  }

}
