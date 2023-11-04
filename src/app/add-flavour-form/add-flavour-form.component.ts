import { Component, OnInit } from '@angular/core';
import {  UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-flavour-form',
  templateUrl: './add-flavour-form.component.html',
  styleUrls: ['./add-flavour-form.component.css']
})
export class AddFlavourFormComponent implements OnInit {

  flavourForm : UntypedFormGroup;
  isInsertingFlavour:boolean;

  flavour:string;
  shopPrice:number;
  customerPrice:number;
  flavourKey:string;
  isEdit:boolean;



  constructor(private apiService : ApiserviceService,private toastr : ToastrService , private route : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.flavour = this.route.snapshot.params["flavour"];
    this.shopPrice = this.route.snapshot.params["sp"];
    this.customerPrice = this.route.snapshot.params["cp"];
    this.flavourKey = this.route.snapshot.params["flavourKey"];
    this.isEdit = this.route.snapshot.params["type"] === "new" ? false : true;

    if(this.isEdit)
    {
      this.flavourForm = new UntypedFormGroup({
        'flavourName' : new UntypedFormControl(this.flavour , [Validators.required]),
        'shopPrice' : new UntypedFormControl(this.shopPrice , [Validators.required]),
        'customerPrice' : new UntypedFormControl(this.customerPrice , [Validators.required])
      });
    }
    else
    {
      this.flavourForm = new UntypedFormGroup({
        'flavourName' : new UntypedFormControl(null , [Validators.required]),
        'shopPrice' : new UntypedFormControl(0 , [Validators.required]),
        'customerPrice' : new UntypedFormControl(0 , [Validators.required])
      });
    }
    
    this.isInsertingFlavour = false;
  }

  onSubmit()
  {
    this.isInsertingFlavour = true;
    if(!this.isEdit)
    {
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

    else
    {
      this.apiService.editFlavour(this.flavourForm.value,this.flavourKey).subscribe((_)=>{
        this.isInsertingFlavour = false;
        this.toastr.success('Flavour Editted Successfully!', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
        this.flavourForm.reset();
        this.router.navigate(['/cakes/flavours']);
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
}
