import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContainerComponent } from 'src/app/container/container.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {

  distributorsData : any[];
  distributorKeys : any[];
  distributorUsefulData : any[];
  isLoading:boolean;
  filteredDistributorUsefulData:any[];

  constructor(private apiService : ApiserviceService , private toastr : ToastrService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.distributorUsefulData = [];
    this.filteredDistributorUsefulData = [];
    this.getDistributors();
  }


  getDistributors()
  {
    this.isLoading = true;
    this.apiService.getDistributors().subscribe((distributors)=>{
      if(distributors == null)
      {
        this.distributorsData = [];
        this.distributorKeys = [];
        this.distributorUsefulData = [];
        this.isLoading = false;
        return;
      }
      this.distributorsData = Object.values(distributors);
      this.distributorKeys = Object.keys(distributors);
      this.formDistributorsFullData(distributors);
      this.isLoading = false;
    });
  }

  formDistributorsFullData(distributors)
  {
    this.distributorUsefulData = [];
    for(let i=0;i<this.distributorKeys.length;i++)
    {
      let obj = {...distributors[this.distributorKeys[i]] , "distributorKey" : this.distributorKeys[i]};
      this.distributorUsefulData.push(obj);
    }
    this.distributorUsefulData.sort((a, b) => (a.distributorship.trim() > b.distributorship.trim()) ? 1 : -1)
    this.filteredDistributorUsefulData = [...this.distributorUsefulData];
  }

  deleteDistributor(distributorKey)
  {
    this.isLoading = true;
    this.apiService.deleteDistributor(distributorKey).subscribe((_)=>{
      this.toastr.success('Distributor Deleted Successfully', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getDistributors();
    });
  }

  openDialog(retailerName , retailerKey) //generic method tha to chheda nahi.
  {
    let dialogRef = this.dialog.open(ContainerComponent , {data : {retailerName : retailerName.toUpperCase()}});

    dialogRef.afterClosed().subscribe((result)=>{
      if(result === "yes")
      {
        this.deleteDistributor(retailerKey);
      }
    }); 
  }

  filterDistributors(dataReceivedEvent)
  {
    let dataReceived = dataReceivedEvent.target.value;
    if(dataReceived.toString().trim().length == 0)
    {
      this.filteredDistributorUsefulData = [...this.distributorUsefulData];
      return;
    }
    this.filteredDistributorUsefulData = this.distributorUsefulData.filter((distributorObj)=>{
      console.log(distributorObj.distributorId);
      if(distributorObj.distributorship.toString().trim().toLowerCase().includes(dataReceived.toString().trim().toLowerCase()) || distributorObj.distributorId.toString().trim().toLowerCase().includes(dataReceived.toString().trim().toLowerCase()))
      {
        return true;
      }
    });
  }


}
