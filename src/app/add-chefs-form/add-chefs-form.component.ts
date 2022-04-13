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
  categories : {categoryName : string}[];


  constructor(private apiService : ApiserviceService , private toastr : ToastrService , private utilityService : UtilityServiceService) { }

  ngOnInit(): void {
    this.categories = this.utilityService.categories;
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
      this.isInsertingChef = false;
      this.toastr.success('Can now use chef app!', 'Chef added!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.addChefForm.reset();
      this.addChefForm.controls['password'].setValue('muskan012@');
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
