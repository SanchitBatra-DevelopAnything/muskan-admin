import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup;
  validUsers : {};
  isLoading : Boolean;
  internetProblem : Boolean;

  constructor(private apiService : ApiserviceService) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null), 
      'password' : new FormControl(null)
    });

    this.isLoading = true;
    this.internetProblem = false;
    
    this.fetchAdmins();
  
  }
  onSubmit()
  {
    let adminIndex = this.isAdminRegistered(this.loginForm.value.username);
    let arr : {username : string , password : string}[];
    arr = Object.values(this.validUsers);
    if(adminIndex!=-1)
    {
      if(arr[adminIndex].password != this.loginForm.value.password)
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
    let arr : {username : string , password : string}[];
    arr = Object.values(this.validUsers);
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i].username == adminName)
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

  fetchAdmins()
  {
    this.apiService.getAdmins().subscribe((admins)=>{
      console.log(admins);
      this.validUsers = admins;
      this.internetProblem = false;
      this.isLoading = false;
    }) , (err)=>{
      this.isLoading = false;
      this.internetProblem = true;
    };
  }

}
