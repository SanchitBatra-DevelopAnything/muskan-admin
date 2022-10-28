import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-distributorship-form',
  templateUrl: './add-distributorship-form.component.html',
  styleUrls: ['./add-distributorship-form.component.css']
})
export class AddDistributorshipFormComponent implements OnInit {

  isInsertingDistributorship : boolean;
  addDistributorshipForm: FormGroup;

  constructor(private apiService : ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isInsertingDistributorship = false;
    this.addDistributorshipForm = new FormGroup({
      'distributorship' : new FormControl(null , [Validators.required]),
    });
  }

  onSubmit()
  {
    this.isInsertingDistributorship = true;
    this.addDistributorshipForm.patchValue({
      distributorship : this.addDistributorshipForm.value.distributorship.toUpperCase().trim()
    })
    this.apiService.addDistributorship(this.addDistributorshipForm.value).subscribe((_)=>{
      this.isInsertingDistributorship = false;
      this.toastr.success('Shop Added Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.addDistributorshipForm.reset();
    }) , (err)=>{
      this.isInsertingDistributorship = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }

}
