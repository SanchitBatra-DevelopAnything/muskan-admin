import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input()
  category : any;

  @Input()
  categoryKeyInDb:string;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteCategory()
  {
    console.log("key = ",this.categoryKeyInDb);
    console.log("value = ", this.category);
  }

}
