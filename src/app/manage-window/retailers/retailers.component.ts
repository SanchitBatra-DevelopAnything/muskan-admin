import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContainerComponent } from 'src/app/container/container.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {

  retailersData : any[];
  retailerKeys : any[];
  retailerUsefulData : any[];
  isLoading:boolean;

  constructor(private apiService : ApiserviceService , private toastr : ToastrService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.getRetailers();
  }


  getRetailers()
  {
    this.isLoading = true;
    this.apiService.getRetailers().subscribe((retailers)=>{
      if(retailers == null)
      {
        this.retailersData = [];
        this.retailerKeys = [];
        this.retailerUsefulData = [];
        this.isLoading = false;
        return;
      }
      this.retailersData = Object.values(retailers);
      this.retailerKeys = Object.keys(retailers);
      this.formRetailersFullData(retailers);
      this.isLoading = false;
    });
  }

  formRetailersFullData(retailers)
  {
    this.retailerUsefulData = [];
    for(let i=0;i<this.retailerKeys.length;i++)
    {
      let obj = {...retailers[this.retailerKeys[i]] , "retailerKey" : this.retailerKeys[i]};
      this.retailerUsefulData.push(obj);
    }
    this.retailerUsefulData.sort((a, b) => (a.shopAddress > b.shopAddress) ? 1 : -1)
  }

  deleteRetailer(retailerKey)
  {
    this.isLoading = true;
    this.apiService.deleteRetailer(retailerKey).subscribe((_)=>{
      this.toastr.success('Retailer Deleted Successfully', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getRetailers();
    });
  }

  openDialog(retailerName , retailerKey)
  {
    let dialogRef = this.dialog.open(ContainerComponent , {data : {retailerName : retailerName.toUpperCase()}});

    dialogRef.afterClosed().subscribe((result)=>{
      if(result === "yes")
      {
        this.deleteRetailer(retailerKey);
      }
    }); 
  }


}
