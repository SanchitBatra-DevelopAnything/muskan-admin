import { Component, OnInit } from '@angular/core';
import { MAT_DATEPICKER_VALUE_ACCESSOR } from '@angular/material/datepicker';
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
  filteredRetailerUsefulData:any[];

  constructor(private apiService : ApiserviceService , private toastr : ToastrService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.retailerUsefulData = [];
    this.filteredRetailerUsefulData = [];
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
    this.retailerUsefulData.sort((a, b) => (a.shopAddress.trim() > b.shopAddress.trim()) ? 1 : -1)
    this.filteredRetailerUsefulData = [...this.retailerUsefulData];
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

  filterRetailers(dataReceivedEvent)
  {
    let dataReceived = dataReceivedEvent.target.value;
    if(dataReceived.toString().trim().length == 0)
    {
      this.filteredRetailerUsefulData = [...this.retailerUsefulData];
      return;
    }
    this.filteredRetailerUsefulData = this.retailerUsefulData.filter((retailerObj)=>{
      console.log(retailerObj.shopAddress);
      if(retailerObj.shopAddress.toString().trim().toLowerCase().includes(dataReceived.toString().trim().toLowerCase()) || retailerObj.retailerName.toString().trim().toLowerCase().includes(dataReceived.toString().trim().toLowerCase()))
      {
        return true;
      }
    });
  }


}
