import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

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

  isDeleting : boolean;

  constructor(private utilityService : UtilityServiceService , private apiService : ApiserviceService , private router:Router) { }

  ngOnInit(): void {
    this.isDeleting = false;
  }

  onDeleteCategory()
  {
    this.isDeleting = true;
    this.apiService.deleteCategory(this.categoryKeyInDb).subscribe((_)=>{
      this.utilityService.categoryDeleted.next(this.categoryKeyInDb);
      this.isDeleting = false;
    });
  }

  onAddItem()
  {
    this.router.navigate(['item/upload/'+this.categoryKeyInDb + "/" + this.category.categoryName]);
  }

  onAddSubcategory()
  {
    this.router.navigate(['subcategory/upload/'+this.categoryKeyInDb + "/" + this.category.categoryName]);
  }

}
