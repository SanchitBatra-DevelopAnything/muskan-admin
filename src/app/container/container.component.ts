import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  correctPassword:boolean;
  actualDeleteKey:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    this.correctPassword = false;
    this.actualDeleteKey = "gulabjamun123";
  }

  onTypingPassword(e)
  {
    let typedPassword = e.target.value;
    if(typedPassword.toString() === this.actualDeleteKey)
    {
      this.correctPassword = true;
    }
    else
    {
      this.correctPassword = false;
    }
  }

}
