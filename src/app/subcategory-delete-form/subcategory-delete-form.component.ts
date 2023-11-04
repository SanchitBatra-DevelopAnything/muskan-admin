import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-subcategory-delete-form',
  templateUrl: './subcategory-delete-form.component.html',
  styleUrls: ['./subcategory-delete-form.component.css']
})
export class SubcategoryDeleteFormComponent implements OnInit {

  categoryKey : string;
  categoryName : string;
  deleteSubcategoryForm : UntypedFormGroup;
  isDeletingSubcategory : boolean;

  subcategories : any;
  isLoading: boolean;

  constructor(private apiService : ApiserviceService , private route : ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subcategories = [];
    this.categoryKey = this.route.snapshot.params['categoryKey'];
    this.categoryName = this.route.snapshot.params['categoryName'].toString().toUpperCase();
    this.isDeletingSubcategory = false;
    this.deleteSubcategoryForm = new UntypedFormGroup({
      'subcategoryToBeDeleted' : new UntypedFormControl(null , [Validators.required]), 
    });

    this.apiService.getSubcategoriesOfCategory(this.categoryKey).subscribe((data)=>{
      if(data == null)
      {
        this.subcategories = [];
        this.isLoading = false;
        return;
      }
      let subcategoryKeys = Object.keys(data);
      let subcategoryValues = Object.values(data);
      for(let i=0;i<subcategoryValues.length;i++)
      {
        console.log("loop"+subcategoryKeys[i]);
        this.subcategories.push({'name' : subcategoryValues[i]['subcategoryName'] , 'subcategoryKey' : subcategoryKeys[i]});
        console.log("pushed" + this.subcategories[i].name+","+this.subcategories[i].subcategoryKey);
      }
      this.isLoading = false;
    });
  }

  onSubmit()
  {
    console.log(this.deleteSubcategoryForm.value);
    this.isDeletingSubcategory = true;
    this.apiService.deleteSubcategoryOfCategory(this.categoryKey ,this.deleteSubcategoryForm.value.subcategoryToBeDeleted).subscribe((_)=>{
      this.isDeletingSubcategory = false;
      this.router.navigate(['itemsOf/'+this.categoryKey+"/"+this.categoryName]);
    });
  }

}
