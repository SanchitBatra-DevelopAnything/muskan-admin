import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-manage-window',
  templateUrl: './manage-window.component.html',
  styleUrls: ['./manage-window.component.css']
})
export class ManageWindowComponent implements OnInit {


  constructor(private router : Router) { }

  ngOnInit(): void {
    this.router.navigate(['/manage/shops']);
  }

}
