import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  isLoading : boolean;
  categoryList : any[];
  categoryKeys : any[];
  fetchError : boolean;

  constructor(private apiService : ApiserviceService , private utilityService:UtilityServiceService) { }

  ngOnInit(): void {
    this.utilityService.categoryDeleted.subscribe((deletedKey:string)=>{
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
      this.categoryKeys = Object.keys(allCategories);
      this.fetchError = false;
      this.isLoading = false;
    }) , (err)=>{
      this.fetchError = true;
      this.isLoading = false;
    };
  }

}
