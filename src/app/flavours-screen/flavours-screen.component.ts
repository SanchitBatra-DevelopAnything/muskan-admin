import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flavours-screen',
  templateUrl: './flavours-screen.component.html',
  styleUrls: ['./flavours-screen.component.css']
})
export class FlavoursScreenComponent implements OnInit {

  flavours : {flavourName : string , shopPrice : number , customerPrice : number}[];

  constructor() { }

  ngOnInit(): void {
    this.flavours = [{flavourName : "pineapple" , shopPrice : 250 , customerPrice : 340} ,{flavourName : "chocloate" , shopPrice : 250 , customerPrice : 340} ];
  }

  hello()
  {
    console.log("hekkli");
  }

}
