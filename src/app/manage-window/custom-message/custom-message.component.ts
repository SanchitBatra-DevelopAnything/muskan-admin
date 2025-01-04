import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-custom-message',
  templateUrl: './custom-message.component.html',
  styleUrls: ['./custom-message.component.css']
})
export class CustomMessageComponent implements OnInit {

  // customMessageForm:UntypedFormGroup;
  showToUser:boolean;
  isUpdatingMessage:boolean;
  headline:string;
  message:string;
  messageKeyOnDB:string;

  constructor(private apiService:ApiserviceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.showToUser = true;
    this.isUpdatingMessage = false;
    this.getCurrentMessage();
  }

  onSubmit()
  {
    this.isUpdatingMessage = true;
    this.showToUser = true;
    if(this.headline.trim() == "" || this.message.trim() == "")
    {
      this.showToUser = false;
    }
    let body = {
      'headline' : this.headline,
      'message' : this.message,
      'show' : this.showToUser
    }
    this.apiService.updateConditionalMessage(this.messageKeyOnDB , body).subscribe((_)=>{
      this.isUpdatingMessage = false;
      this.toastr.success('Message Updated Successfully!', 'Notification!' , {
        timeOut : 4000 ,
        closeButton : true , 
        positionClass : 'toast-top-right'
      });
    });
  }

  getCurrentMessage()
  {
    this.isUpdatingMessage = true;
    this.apiService.getConditionalMessage().subscribe((result)=>{
      var res = Object.values(result)[0];
      this.messageKeyOnDB = Object.keys(result)[0];
      this.headline = res['headline'];
      this.message = res['message'];
    });
    this.isUpdatingMessage = false;
  }

}
