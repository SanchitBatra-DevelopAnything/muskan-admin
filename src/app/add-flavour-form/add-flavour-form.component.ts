import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-flavour-form',
  templateUrl: './add-flavour-form.component.html',
  styleUrls: ['./add-flavour-form.component.css']
})
export class AddFlavourFormComponent implements OnInit {

  flavourForm : FormGroup;
  isInsertingFlavour:boolean;



  constructor(private apiService : ApiserviceService,private toastr : ToastrService , private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.flavourForm = new FormGroup({
      'flavourName' : new FormControl(null , [Validators.required]),
      'shopPrice' : new FormControl(0 , [Validators.required]),
      'customerPrice' : new FormControl(0 , [Validators.required])
    });
    this.isInsertingFlavour = false;
  }

  onSubmit()
  {
    this.isInsertingFlavour = true;
    this.apiService.addFlavour(this.flavourForm.value).subscribe((_)=>{
      this.isInsertingFlavour = false;
      this.toastr.success('Flavour Added Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.flavourForm.reset();
      this.flavourForm.controls['shopPrice'].setValue(0);
      this.flavourForm.controls['customerPrice'].setValue(0);
    }) , (err)=>{
      this.isInsertingFlavour = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }
}
