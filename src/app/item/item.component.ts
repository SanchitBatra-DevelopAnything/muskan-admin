import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item : any; //comes with a key.

  isDeleting : boolean;

  constructor() { }

  ngOnInit(): void {
    this.isDeleting = false;
  }

  deleteItem()
  {
    this.isDeleting = true;
    setTimeout(()=>{
      this.isDeleting = false;
    },3000);
  }

}
