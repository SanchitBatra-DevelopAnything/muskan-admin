import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup;
  validUsers : {username : string , password : string}[];

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null), 
      'password' : new FormControl(null)
    });

    this.validUsers = [{'username' : 'nkharbanda' , 'password' : 'nitish123'},{'username' : 'ritkharbanda' , 'password' : 'ritesh007'}];
  
  }
  onSubmit()
  {
    let adminIndex = this.isAdminRegistered(this.loginForm.value.username);
    if(adminIndex!=-1)
    {
      if(this.validUsers[adminIndex].password != this.loginForm.value.password)
      {
        alert('invalid password');
        return;
      }
      this.loginSuccessfull();
    }
    else
    {
      alert('Sorry , you are not registered!');
    }
  }

  isAdminRegistered(adminName:string) : number
  {
    for(let i=0;i<this.validUsers.length;i++)
    {
      if(this.validUsers[i].username == adminName)
      {
        return i;
      }
    }
    return -1;
  }

  loginSuccessfull() : void 
  {
    console.log("Logged in");
  }

}
