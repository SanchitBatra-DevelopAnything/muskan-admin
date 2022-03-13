import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  categories:AngularFireList<any>;

  constructor(private Firebase : AngularFireDatabase) { }

  initializeCategoriesWithImages()
  {
    this.categories = this.Firebase.list('Categories'); //node name of db here.
  }

  // initializeItemsWithImages()
  // {

  // }

  insertCategories(categories)
  {
    this.categories.push(categories);
  }
}
