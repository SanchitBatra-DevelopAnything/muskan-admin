import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item : any;

  @Input()
  itemKeyInDb: string;

  constructor() { }

  ngOnInit(): void {
    console.log("Forming item with");
    console.log(this.item.itemName , this.item.offer + "%" , this.itemKeyInDb)
  }

}
