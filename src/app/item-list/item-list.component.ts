import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit , OnDestroy {


  isLoading : boolean;
  ItemsList : any[];
  fullItemsObject: any[]; //items combined with keys for search easy.
  filteredItems:any[];
  ItemsKeys : any[];
  fetchError : boolean;
  searchInput:string;

  noItems : boolean;

  subcategories:any[];
  subcategoryKeys : any[];

  categoryKey : string;
  categoryName : string;
  selectedSubcategory : string;
  selectedSubcategoryKey:string;

  deleteItemSub : Subscription;
  updateItemSub: Subscription;

  isCategoryForDistributor : boolean;

  @Output()
  flavours:any;
  @Output()
  designs:any;
  @Output()
  flavoursOnlyValues:any;
  @Output()
  designsOnlyValues:any;



  constructor(private apiService : ApiserviceService , private route : ActivatedRoute , private utilityService : UtilityServiceService , private router : Router) { }

  ngOnInit(): void {
    this.noItems = false;
    this.selectedSubcategory = "Direct Variety";
    this.selectedSubcategoryKey = "dv";
    this.isLoading = true;
    this.fetchError = false;
    this.categoryKey = this.route.snapshot.params['categoryKey'];
    this.categoryName = this.route.snapshot.params['categoryName'];
    this.isCategoryForDistributor = false;
    this.apiService.isCategoryForDistributor(this.categoryKey).subscribe((ans)=>{
      this.isCategoryForDistributor = ans;
    });
    if(this.categoryName.toUpperCase() === "CAKES & PASTRIES")
    {
      this.fetchFlavours();
      this.fetchDesigns();
    }
    this.loadSubcategories();
   this.deleteItemSub =  this.utilityService.itemDeleted.subscribe((_)=>{
     this.searchInput = "";
      this.loadItems(this.selectedSubcategory , this.selectedSubcategoryKey);
    });
    this.updateItemSub = this.utilityService.itemUpdated.subscribe((_)=>{
      this.searchInput = "";
      this.loadItems(this.selectedSubcategory,this.selectedSubcategoryKey);
    });
    this.loadItems("Direct Variety" , "dv");
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
      this.flavoursOnlyValues = this.flavours.map(flavour=>{
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
      this.designsOnlyValues = this.designs.map((design)=>{
        return design.designName;
      });
    });
  }


  loadItems(Subcategory : string , subcategoryKey : string)
  {
    this.ItemsList = [];
    this.ItemsKeys = [];
    this.fullItemsObject = [];
    this.filteredItems = this.fullItemsObject;
    this.isLoading = true;
    this.selectedSubcategory = Subcategory; //this is to change the active class on UI
    this.selectedSubcategoryKey = subcategoryKey;

    this.apiService.getItems(subcategoryKey , this.categoryKey).subscribe((items)=>{
      if(items == null)
      {
        this.ItemsList = [];
        this.ItemsKeys = [];
        this.fullItemsObject = [];
        this.filteredItems = this.fullItemsObject;
        this.isLoading = false;
        this.noItems = true;
        return;
      }
      this.ItemsKeys = Object.keys(items);
      this.ItemsList = Object.values(items);
      this.fullItemsObject = this.combineItemKeys();
      this.filteredItems = this.fullItemsObject;
      this.isLoading = false;
      this.noItems = false;
    })
  }

  loadSubcategories()
  {
    this.apiService.getSubcategoriesOfCategory(this.categoryKey).subscribe((subs)=>{
      if(subs == null)
      {
        this.subcategories = [];
        this.subcategoryKeys = [];
        this.isLoading = false;
        return;
      }
      this.subcategories = Object.values(subs);
      this.subcategoryKeys = Object.keys(subs);
      this.isLoading = false;
    });
  }

  combineItemKeys()
  {
    let arr = [];
    for(let i=0;i<this.ItemsList.length;i++)
    {
      let item = this.ItemsList[i];
      item['key'] = this.ItemsKeys[i];
      arr.push(item);
    }
    return arr;
  }

  searchItems()
  {
    this.filteredItems = this.fullItemsObject.filter(item=>{
      let str1 = item.itemName.toUpperCase();
      let str2 = this.searchInput.toUpperCase();
      return str1.includes(str2);
    });
  }

  moveToFlavours()
  {
    this.router.navigate(['/cakes/flavours']);
  }

  moveToDesignCategories()
  {
    this.router.navigate(['/cakes/designCategories']);
  }

  deleteASubcategory()
  {
    this.router.navigate(['/deleteSubcategory/'+this.categoryKey+"/"+this.categoryName]);
  }

  editSubcategory()
  {
    this.router.navigate(['editSubcategory/' + this.categoryKey + "/" + this.categoryName]);
  }

  exportToExcel()
  {
    let fileName = "PRICELIST_"+this.selectedSubcategory+"_"+this.categoryName+".xlsx";
    let element = document.getElementById("excel-table");
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet 1");

    XLSX.writeFile(wb , fileName);
  }
 
  ngOnDestroy()
  {
    this.deleteItemSub.unsubscribe();
    this.updateItemSub.unsubscribe();
  }
}
