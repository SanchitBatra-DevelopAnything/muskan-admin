import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-window',
  templateUrl: './manage-window.component.html',
  styleUrls: ['./manage-window.component.css']
})
export class ManageWindowComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  openShopUpload(){
    this.router.navigate(['/shop/upload']);
  }

}
