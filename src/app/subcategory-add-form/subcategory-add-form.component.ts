import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-subcategory-add-form',
  templateUrl: './subcategory-add-form.component.html',
  styleUrls: ['./subcategory-add-form.component.css']
})
export class SubcategoryAddFormComponent implements OnInit {

  subcategoryForm : UntypedFormGroup;
  isInsertingSubcategory : boolean;
  parentCategoryData : {parentCategoryId : string, parentCategoryName: string};

  constructor(private route:ActivatedRoute , private apiService : ApiserviceService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.parentCategoryData = {parentCategoryId : this.route.snapshot.params['categoryKey'] , parentCategoryName : this.route.snapshot.params['categoryName']};
    this.isInsertingSubcategory = false;
    this.subcategoryForm = new UntypedFormGroup({subcategoryName : new UntypedFormControl(null , [Validators.required])});
  }

  onSubmit()
  { 
    this.isInsertingSubcategory = true;
    this.apiService.addSubcategory(this.subcategoryForm.value , this.parentCategoryData.parentCategoryId).subscribe((_)=>{
      this.isInsertingSubcategory = false;
      this.toastr.success('Subcategory Added Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.subcategoryForm.reset();
    }) , (err)=>{
      this.isInsertingSubcategory = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }

}
