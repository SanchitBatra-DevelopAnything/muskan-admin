import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  categories:AngularFireList<any>;

  constructor(private Firebase : AngularFireDatabase , private apiService : ApiserviceService) { }

  initializeCategoriesWithImages()
  {
    this.categories = this.Firebase.list('Categories');
  }

  // initializeItemsWithImages()
  // {

  // }

  insertCategories(categories)
  {
    //this.categories.push(categories);
    this.apiService.insertCategory(categories).subscribe((catKey)=>{
      this.apiService.uploadOnlyCategory(catKey['name'],categories).subscribe((_)=>{
        console.log("Inserted");
      });
    });
  }
}
