import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-design-category-form',
  templateUrl: './add-design-category-form.component.html',
  styleUrls: ['./add-design-category-form.component.css']
})
export class AddDesignCategoryFormComponent implements OnInit {

  designCategoryForm: FormGroup;
  isInsertingDesign:boolean;
  design:string;
  shopPrice:number;
  customerPrice:number;
  designKey:string;
  isEdit:boolean;

  constructor(private apiService :ApiserviceService , private toastr : ToastrService , private route : ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

    this.design = this.route.snapshot.params["design"];
    this.shopPrice = this.route.snapshot.params["sp"];
    this.customerPrice = this.route.snapshot.params["cp"];
    this.designKey = this.route.snapshot.params["designKey"];
    this.isEdit = this.route.snapshot.params["type"] === "new" ? false : true;

    if(this.isEdit)
    {
      this.designCategoryForm = new FormGroup({
        'designName' : new FormControl(this.design , [Validators.required]),
        'shopPrice' : new FormControl(this.shopPrice , [Validators.required]),
        'customerPrice' : new FormControl(this.customerPrice , [Validators.required])
      });
    }
    else
    {
      this.designCategoryForm = new FormGroup({
        'designName' : new FormControl(null , [Validators.required]),
        'shopPrice' : new FormControl(0 , [Validators.required]),
        'customerPrice' : new FormControl(0 , [Validators.required])
      });
    }
    
    this.isInsertingDesign = false;
  }

  onSubmit()
  {
    this.isInsertingDesign = true;
    if(!this.isEdit)
    {
      this.apiService.addDesign(this.designCategoryForm.value).subscribe((_)=>{
        this.isInsertingDesign = false;
        this.toastr.success('Design Added Successfully!', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
        this.designCategoryForm.reset();
        this.designCategoryForm.controls['shopPrice'].setValue(0);
        this.designCategoryForm.controls['customerPrice'].setValue(0);
      }) , (err)=>{
        this.isInsertingDesign = false;
        this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
          timeOut:4000,
          positionClass: 'toast-bottom-right',
          closeButton: true
        });
      };
    }

    else
    {
      this.apiService.editDesign(this.designCategoryForm.value,this.designKey).subscribe((_)=>{
        this.isInsertingDesign = false;
        this.toastr.success('Design Editted Successfully!', 'Notification!' , {
          timeOut : 4000 ,
          closeButton : true , 
          positionClass : 'toast-bottom-right'
        });
        this.designCategoryForm.reset();
        this.router.navigate(['/cakes/designCategories']);
      }) , (err)=>{
        this.isInsertingDesign = false;
        this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
          timeOut:4000,
          positionClass: 'toast-bottom-right',
          closeButton: true
        });
      };
    }
    
  }

}
