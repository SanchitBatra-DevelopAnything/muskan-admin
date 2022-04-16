import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-add-chefs-form',
  templateUrl: './add-chefs-form.component.html',
  styleUrls: ['./add-chefs-form.component.css']
})
export class AddChefsFormComponent implements OnInit {

  addChefForm : FormGroup;
  isInsertingChef : boolean;
  isLoading : boolean;
  categories : {categoryName : string}[];
  cantLoadCategories : boolean;


  constructor(private apiService : ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cantLoadCategories = false;
    this.categories = [];
    this.apiService.getCategories().subscribe(catgs=>{
      let categoriesData:any[] = Object.values(catgs);
      if(catgs == null)
      {
        this.categories = [];
        this.isLoading = false;
        return;
      }
      for(let i=0;i<categoriesData.length;i++)
      {
        this.categories.push({categoryName : categoriesData[i].categoryName});
      }
      this.isLoading = false;
    }),(err)=>{
      this.isLoading = false;
      this.cantLoadCategories = true;
    };
    this.isInsertingChef = false;
    this.addChefForm = new FormGroup({
      'chefName' : new FormControl(null , [Validators.required]), 
      'password' : new FormControl('muskan012@', [Validators.required]),
      'manages' : new FormControl(null , [Validators.required])
    });
  }

  onSubmit()
  { 
    this.isInsertingChef = true;
    this.apiService.addChef(this.addChefForm.value).subscribe((_)=>{
      this.apiService.setBaseForChefNotificationToken(this.addChefForm.value).subscribe((_)=>{
        this.isInsertingChef = false;
      this.toastr.success('Can now use chef app!', 'Chef added!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.addChefForm.reset();
      this.addChefForm.controls['password'].setValue('muskan012@');

      });
    }) , (err)=>{
      this.isInsertingChef = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }

}
