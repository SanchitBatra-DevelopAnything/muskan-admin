import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  isLoading : boolean;
  shopsData:any[];
  shopKeys : any[];

  constructor(private apiService : ApiserviceService , private router : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.getShops();
  }

  getShops()
  {
    this.isLoading = true;
    this.apiService.getShops().subscribe((shops)=>{
      if(shops == null)
      {
        this.shopsData = [];
        this.shopKeys = [];
        this.isLoading = false;
        return;
      }
      this.shopsData = Object.values(shops);
      this.shopKeys = Object.keys(shops);
      this.isLoading = false;
    });
  }

  openShopUpload()
  {
    this.router.navigate(['/shop/upload']);
  }

  deleteShop(index)
  {
    this.apiService.deleteShop(this.shopKeys[index]).subscribe((_)=>{
      this.toastr.success('Shop Deleted Successfully , Loading shops now', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getShops();
    });
  }

}
