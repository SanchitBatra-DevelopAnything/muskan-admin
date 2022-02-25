import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private utilityService : UtilityServiceService , private apiService : ApiserviceService) { }

  ngOnInit(): void {
  }

  onDeleteCategory()
  {
    this.apiService.deleteCategory(this.categoryKeyInDb).subscribe((_)=>{
      this.utilityService.categoryDeleted.next(this.categoryKeyInDb);
    });
  }

  onAddItem()
  {

  }

  onAddSubcategory()
  {

  }

}
