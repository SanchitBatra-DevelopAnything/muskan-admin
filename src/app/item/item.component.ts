import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item : any; //comes with a key.

  @Input()
  parentSubcategoryKey : any;

  @Input()
  parentCategoryKey:any; //dv in case of direct variety.

  isDeleting : boolean;

  constructor(private apiService : ApiserviceService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.isDeleting = false;
    console.log("FORMING ITEM ", this.parentSubcategoryKey , this.parentCategoryKey);
  }

  deleteItem()
  {
    this.isDeleting = true;
    this.apiService.deleteItem(this.parentCategoryKey , this.parentSubcategoryKey , this.item.key).subscribe((_)=>{
      this.utilityService.itemDeleted.next(this.item.key);
      this.isDeleting = false;
    });
  }

}
