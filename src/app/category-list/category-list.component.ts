import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit , OnDestroy{

  isLoading : boolean;
  categoryList : any[];
  categoryKeys : any[];
  fetchError : boolean;

  deleteSubscription : Subscription;

  constructor(private apiService : ApiserviceService , private utilityService:UtilityServiceService) { }

  ngOnInit(): void {
    this.deleteSubscription = this.utilityService.categoryDeleted.subscribe((deletedKey:string)=>{
      this.loadCategories();
    });
    this.loadCategories();
  }

  loadCategories()
  {
    this.isLoading = true;
    this.fetchError = false;
    this.apiService.getCategories().subscribe((allCategories)=>{
      this.categoryList = Object.values(allCategories);
      let categoryNames = [];
      for(let i=0;i<this.categoryList.length;i++)
      {
        categoryNames.push(this.categoryList[i].categoryName);
      }
      this.utilityService.uploadCategories(categoryNames); //centeralize the category names available. to use in other components.
      this.categoryKeys = Object.keys(allCategories);
      this.fetchError = false;
      this.isLoading = false;
    }) , (err)=>{
      this.fetchError = true;
      this.isLoading = false;
    };
  }


  ngOnDestroy()
  {
    this.deleteSubscription.unsubscribe();
  }

}
