import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-salesman-form',
  templateUrl: './add-salesman-form.component.html',
  styleUrls: ['./add-salesman-form.component.css']
})
export class AddSalesmanFormComponent implements OnInit {

  salesmanForm : UntypedFormGroup;
  isInsertingSalesman : boolean;

  constructor(private apiService : ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.isInsertingSalesman = false;
    this.salesmanForm = new UntypedFormGroup({
      'salesmanName' : new UntypedFormControl('' , [Validators.required])
    });
  }

  onSubmit()
  {
    this.isInsertingSalesman = true;
    this.apiService.addSalesman(this.salesmanForm.value).subscribe((_)=>{
      this.isInsertingSalesman = false;
      this.toastr.success('Salesman Added Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-bottom-right'
      });
      this.salesmanForm.reset();
    }) , (err)=>{
      this.isInsertingSalesman = false;
      this.toastr.error('Error Occured , Try again later!' , 'Bad Internet :(' , {
        timeOut:4000,
        positionClass: 'toast-bottom-right',
        closeButton: true
      });
    };
  }

}
