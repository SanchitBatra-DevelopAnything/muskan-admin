import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-salesmen',
  templateUrl: './salesmen.component.html',
  styleUrls: ['./salesmen.component.css']
})
export class SalesmenComponent implements OnInit {

  salesmenData : any[];
  salesmenKeys : any[];
  isLoading : boolean;

  constructor(private apiService : ApiserviceService , private router : Router , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.getSalesmen();
  }

  getSalesmen()
  {
    this.isLoading = true;
    this.apiService.getSalesman().subscribe((salesmen)=>{
      if(salesmen == null)
      {
        this.salesmenData = [];
        this.salesmenKeys = [];
        this.isLoading = false;
        return;
      }
      this.salesmenData = Object.values(salesmen);
      this.salesmenKeys = Object.keys(salesmen);
      this.isLoading = false;
    });
  }

  openSalesmanUpload()
  {
    this.router.navigate(['/salesman/upload']);
  }

  deleteSalesman(index)
  {
    this.isLoading = true;
    this.apiService.deleteSalesman(this.salesmenKeys[index]).subscribe((_)=>{
      this.toastr.success('Salesman Deleted Successfully', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getSalesmen();
    });
  }

}
