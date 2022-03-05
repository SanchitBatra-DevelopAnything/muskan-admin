import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-manage-window',
  templateUrl: './manage-window.component.html',
  styleUrls: ['./manage-window.component.css']
})
export class ManageWindowComponent implements OnInit {

  shops:any[];
  shopKeys : any[];

  constructor(private router : Router , private apiService:ApiserviceService) { }

  ngOnInit(): void {
    this.getShops();
  }

  openShopUpload(){
    this.router.navigate(['/shop/upload']);
  }

  getShops()
  {
    this.apiService.getShops().subscribe((shops)=>{
      if(shops == null)
      {
        this.shops = [];
        this.shopKeys = [];
        return;
      }
      this.shops = Object.values(shops);
      this.shopKeys = Object.keys(shops);
    });
  }

}
