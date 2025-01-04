import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-distributorships',
  templateUrl: './distributorships.component.html',
  styleUrls: ['./distributorships.component.css']
})
export class DistributorshipsComponent implements OnInit {

  isLoading : boolean;
  distributorshipsData : any;
  distributorshipsKeys : any;

  constructor(private apiService : ApiserviceService,private router:Router , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.getDistributorships();
  }

  getDistributorships()
  {
    this.isLoading = true;
    this.apiService.getDistributorships().subscribe((distributorships)=>{
      if(distributorships == null)
      {
        this.distributorshipsData = [];
        this.distributorshipsKeys = [];
        this.isLoading = false;
        return;
      }
      this.distributorshipsData = Object.values(distributorships);
      this.distributorshipsKeys = Object.keys(distributorships);
      this.isLoading = false;
    });
  }

  openDistributorshipUpload()
  {
    this.router.navigate(['/distributorship/upload']);
  }

  deleteDistributorship(index)
  {
    this.isLoading = true;
    this.apiService.deleteDistributorship(this.distributorshipsKeys[index]).subscribe((_)=>{
      this.toastr.success('Distributorship Deleted Successfully', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.getDistributorships();
    });
  }

}
