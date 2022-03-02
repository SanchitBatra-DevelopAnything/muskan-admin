import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { UtilityServiceService } from '../services/utility-service.service';

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
  // @Output() isLoggedIn = new EventEmitter<Boolean>();

  constructor(private apiService : ApiserviceService , private router: Router , private UtilityService:UtilityServiceService) {
    if(sessionStorage.getItem('user')!==null)
    {
      this.router.navigate(['/categories']);
    }
  }

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
    sessionStorage.setItem('user' , this.loginForm.value.username);
    sessionStorage.setItem('loggedIn' , "true");
    this.UtilityService.loggedInStatusUpdated.next(true); //inform header for the same.

    // this.isLoggedIn.emit(true);
    this.router.navigate(['/categories']);
  }

  fetchAdmins()
  {
    this.apiService.getAdmins().subscribe((admins)=>{
      this.validUsers = admins;
      this.internetProblem = false;
      this.isLoading = false;
    }) , (err)=>{
      this.isLoading = false;
      this.internetProblem = true;
    };
  }

}
