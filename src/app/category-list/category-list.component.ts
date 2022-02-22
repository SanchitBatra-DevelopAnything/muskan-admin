import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList : any[];
  rowIndexArray: any[];

  constructor(private imageService : ImageService) { }

  ngOnInit(): void {

  }

}
