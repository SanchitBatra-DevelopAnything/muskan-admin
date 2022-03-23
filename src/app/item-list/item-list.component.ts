import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

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



  constructor(private apiService : ApiserviceService , private route : ActivatedRoute , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.noItems = false;
    this.selectedSubcategory = "Direct Variety";
    this.selectedSubcategoryKey = "dv";
    this.isLoading = true;
    this.fetchError = false;
    this.categoryKey = this.route.snapshot.params['categoryKey'];
    this.categoryName = this.route.snapshot.params['categoryName'];
    this.loadSubcategories();
   this.deleteItemSub =  this.utilityService.itemDeleted.subscribe((_)=>{
      this.loadItems(this.selectedSubcategory , this.selectedSubcategoryKey);
    });
    this.updateItemSub = this.utilityService.itemUpdated.subscribe((_)=>{
      this.loadItems(this.selectedSubcategory,this.selectedSubcategoryKey);
    });
    this.loadItems("Direct Variety" , "dv");
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

  ngOnDestroy()
  {
    this.deleteItemSub.unsubscribe();
  }
}
