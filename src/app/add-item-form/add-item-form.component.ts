import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  itemForm: FormGroup;
  imgSrc:string;
  selectedImage : any;
  isSubmitted:Boolean;
  parentCategoryData : {categoryKey : string , categoryName : string};
  availableSubcategories : any;
  availableSubcategoriesKeys : any;
  selectedSubcategoryKey : string;
  showSubcategoryDropdown : boolean;

  flavours : any[];
  designCategories : any[];

  constructor(private storage : AngularFireStorage , private apiService: ApiserviceService,private route : ActivatedRoute , private toastr:ToastrService) { }

  ngOnInit(): void {
    this.showSubcategoryDropdown = true;
    this.parentCategoryData = {categoryName : this.route.snapshot.params['categoryName'] , categoryKey : this.route.snapshot.params['categoryKey']};
    this.itemForm = new FormGroup({
      'itemName' : new FormControl('',[Validators.required]), 
      'imageUrl' : new FormControl('' , [Validators.required]),
      'subcategoryName' : new FormControl('',[Validators.required]),
       'shopPrice' : new FormControl(null , [Validators.required]),
       'customerPrice' : new FormControl('' , [Validators.required]),
       'offer' : new FormControl('' , [Validators.required]),
       'directVariety' : new FormControl('0',[Validators.required]),
       'cakeFlavour' : new FormControl(null,[Validators.required]),
       'designCategory' : new FormControl(null,[Validators.required]),
       'minPounds' : new FormControl('-1')
    });

    this.flavours = [];
    this.designCategories = [];

    if(this.parentCategoryData.categoryName.toUpperCase() === "CAKES & PASTRIES")
    {
      this.fetchFlavours();
      this.fetchDesignCategories();
    }

    this.resetForm();

    if(this.parentCategoryData.categoryName.toUpperCase() === "CAKES & PASTRIES")
    {
      this.setPrices("pineapple","not-decided");
    }

    this.fetchAvailableSubcategories();
    
  }

  showPreview(event : any)
  {
    if(event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = (e:any)=>{
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    //if someone clicks cancel
    else {
      this.imgSrc = "../../assets/default.png";
      this.selectedImage = null;
    }
  }

  onSubmit(formValue)
  {
    this.isSubmitted = true;
    if(this.itemForm.valid)
    {
      var filePath = `items/${this.selectedImage.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          //RETRIEVING THE UPLOADED IMAGE URL.
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
            this.apiService.addItem(formValue , this.parentCategoryData.categoryKey , this.selectedSubcategoryKey).subscribe((_)=>{
              this.showToasterNotification();
              this.resetForm();
            });
          });
        })
      ).subscribe();
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
      this.flavours.push({flavourName : "ALL FLAVOURS"});
    });
  }

  fetchDesignCategories()
  {
    this.apiService.getDesignCategories().subscribe((allDesigns)=>{
      if(allDesigns == null)
      {
        this.designCategories = [];
        return;
      }
      this.designCategories = Object.values(allDesigns);
    });
  }

  resetForm()
  {
    this.itemForm.reset();
    if(this.parentCategoryData.categoryName === "CAKES & PASTRIES")
    {
      this.itemForm.setValue({
        itemName : '',
        imageUrl : '',
        subcategoryName : '',
        offer : '',
        shopPrice : '',
        customerPrice: '',
        directVariety : '0',
        minPounds : '-1',
        cakeFlavour : null,
        designCategory : null,
      });
    }
    else
    {
      this.itemForm.setValue({
        itemName : '',
        imageUrl : '',
        subcategoryName : '',
        offer : '',
        shopPrice : '',
        customerPrice: '',
        directVariety : '0',
        minPounds : '-1',
        cakeFlavour : "not-valid",
        designCategory : "not-valid",
      });
    }
    this.imgSrc = "../../assets/default.png";
    this.isSubmitted = false;
    this.selectedImage = null;
  }

  setPrices(flavour:string , design:string)
  {
    let flavourShopPrice = 0;
    let flavourCustomerPrice = 0;
    let designShopPrice = 0;
    let designCustomerPrice= 0;
    if(flavour.toUpperCase() === "ALL FLAVOURS")
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
    if(design === "not-decided")
    {
      designCustomerPrice = 0;
      designShopPrice = 0;
      this.itemForm.controls["shopPrice"].setValue(flavourShopPrice + designShopPrice);
      this.itemForm.controls['customerPrice'].setValue(flavourCustomerPrice + designCustomerPrice);
    }
    else
    {
      for(let i=0;i<this.designCategories.length;i++)
      {
        if(this.designCategories[i].designName.toLowerCase() === design.toLowerCase())
        { 
           designShopPrice = this.designCategories[i].shopPrice;
           designCustomerPrice = this.designCategories[i].customerPrice;
          break;
        }
      }
      this.itemForm.controls["shopPrice"].setValue(flavourShopPrice + designShopPrice);
      this.itemForm.controls['customerPrice'].setValue(flavourCustomerPrice + designCustomerPrice);
    }
  }

  fetchAvailableSubcategories()
  {
    this.apiService.getSubcategoriesOfCategory(this.parentCategoryData.categoryKey).subscribe((subcategories)=>{
      this.availableSubcategories = Object.values(subcategories);
      this.availableSubcategoriesKeys = Object.keys(subcategories);
    });
  }

  subcategoryChanged(selectedSubcategory:any)
  {
    let selectedIndex = this.availableSubcategories.indexOf(selectedSubcategory);
    this.selectedSubcategoryKey = this.availableSubcategoriesKeys[selectedIndex];
  }

  changeItemType(e)
  {
    console.log(e.target.value);
    if(e.target.value === "1")
    {
      this.showSubcategoryDropdown = false;
      this.itemForm.patchValue({
        subcategoryName : 'Direct Variety'
      });
    }
    else
    {
      this.showSubcategoryDropdown = true;
      this.itemForm.patchValue({
        subcategoryName : null
      });
    }
  }

  showToasterNotification()
  {
    this.toastr.success('Item Added Successfully!', 'Notification!' , {
      timeOut : 4000 ,
      closeButton : true , 
      positionClass : 'toast-bottom-right'
    });
  }

  flavourChanged(e)
  {
    let selectedDesign = this.itemForm.controls["designCategory"].value;
    if(selectedDesign == null)
    {
      this.setPrices(e.flavourName , "not-decided");
    }
    else
    {
      this.setPrices(e.flavourName , selectedDesign);
    }
  }

  designChanged(e)
  {
    let selectedFlavour = this.itemForm.controls["cakeFlavour"].value;
    if(selectedFlavour == null)
    {
      this.setPrices("pineapple",e.designName);
    }
    else
    {
      this.setPrices(selectedFlavour , e.designName);
    }
  }

}
