import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  isLoading : boolean;
  ItemsList : any[];
  ItemsKeys : any[];
  fetchError : boolean;

  noItems : boolean;

  subcategories:any[];
  subcategoryKeys : any[];

  categoryKey : string;
  categoryName : string;
  selectedSubcategory : string;

  constructor(private apiService : ApiserviceService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.noItems = false;
    this.selectedSubcategory = "Direct Variety";
    this.isLoading = true;
    this.fetchError = false;
    this.categoryKey = this.route.snapshot.params['categoryKey'];
    this.categoryName = this.route.snapshot.params['categoryName'];
    this.loadSubcategories();
    this.loadItems("Direct Variety" , "dv");
  }

  loadItems(Subcategory : string , subcategoryKey : string)
  {
    this.ItemsList = [];
    this.ItemsKeys = [];
    this.isLoading = true;
    this.selectedSubcategory = Subcategory; //this is to change the active class on UI
    this.apiService.getItems(subcategoryKey , this.categoryKey).subscribe((items)=>{
      if(items == null)
      {
        this.ItemsList = [];
        this.ItemsKeys = [];
        this.isLoading = false;
        this.noItems = true;
        return;
      }
      this.ItemsKeys = Object.keys(items);
      this.ItemsList = Object.values(items);
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

}
