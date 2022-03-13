import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategory-add-form',
  templateUrl: './subcategory-add-form.component.html',
  styleUrls: ['./subcategory-add-form.component.css']
})
export class SubcategoryAddFormComponent implements OnInit {

  subcategoryForm : FormGroup;
  isInsertingSubcategory : boolean;

  constructor() { }

  ngOnInit(): void {
    this.isInsertingSubcategory = false;
    this.subcategoryForm = new FormGroup({subcategoryName : new FormControl(null , [Validators.required])});
  }

  onSubmit()
  { 
    console.log(this.subcategoryForm.value);
  }

}
