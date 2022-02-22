import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  isLoading : boolean;
  categoryList : any[];
  fetchError : boolean;

  constructor(private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchError = false;
    this.apiService.getCategories().subscribe((allCategories)=>{
      this.categoryList = Object.values(allCategories);
      this.fetchError = false;
      this.isLoading = false;
    }) , (err)=>{
      this.fetchError = true;
      this.isLoading = false;
    };
  }

}
