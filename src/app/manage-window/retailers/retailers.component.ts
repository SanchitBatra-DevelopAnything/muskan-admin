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
        this.isLoading = false;
        return;
      }
      this.retailersData = Object.values(retailers);
      this.retailerKeys = Object.keys(retailers);
      this.isLoading = false;
    });
  }

  deleteRetailer(index)
  {
    this.isLoading = true;
    this.apiService.deleteRetailer(this.retailerKeys[index]).subscribe((_)=>{
      this.toastr.success('Retailer Deleted Successfully', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getRetailers();
    });
  }

  openDialog(retailerName , retailerIndex)
  {
    let dialogRef = this.dialog.open(ContainerComponent , {data : {retailerName : retailerName.toUpperCase()}});

    dialogRef.afterClosed().subscribe((result)=>{
      if(result === "yes")
      {
        this.deleteRetailer(retailerIndex);
      }
    }); 
  }


}
