import { Component, OnInit } from '@angular/core';
import { TotalParchiService } from 'src/app/services/dataSharing/total-parchi.service';

@Component({
  selector: 'app-item-wise-detail-total-parchi',
  templateUrl: './item-wise-detail-total-parchi.component.html',
  styleUrls: ['./item-wise-detail-total-parchi.component.css']
})
export class ItemWiseDetailTotalParchiComponent implements OnInit {

  availableItems:any=[];
  selectedItem:any = {};

  constructor(private totalParchiService:TotalParchiService) { }

  ngOnInit(): void {
    this.availableItems = [...this.totalParchiService.makeListFromMap()];
    console.log("ALL ITEMS = " , this.availableItems);
  }

  seeDetails(e:any)
  {

  }

}
