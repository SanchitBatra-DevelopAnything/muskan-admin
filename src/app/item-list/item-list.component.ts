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

  subcategories:any[];
  subcategoryKeys : any[];

  categoryKey : string;
  categoryName : string;

  constructor(private apiService : ApiserviceService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchError = false;
    this.categoryKey = this.route.snapshot.params['categoryKey'];
    this.categoryName = this.route.snapshot.params['categoryName'];
    this.loadSubcategories();
    this.loadItems();
  }

  loadItems()
  {
    
  }

  loadSubcategories()
  {
    this.apiService.getSubcategoriesOfCategory(this.categoryKey).subscribe((subs)=>{
      if(subs == null)
      {
        this.subcategories = [];
        this.subcategoryKeys = [];
        this.isLoading = false;
      }
      this.subcategories = Object.values(subs);
      this.subcategoryKeys = Object.values(subs);
      this.isLoading = false;
    });
  }

}
