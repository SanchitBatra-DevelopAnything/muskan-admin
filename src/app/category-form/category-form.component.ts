import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm : FormGroup;
  imgSrc:string;
  selectedImage : any = null;

  constructor() { }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      'categoryName' : new FormControl(''), 
      'imageUrl' : new FormControl('')
    });

    this.imgSrc = "../../assets/default.png";
  }

  showPreview(event : any)
  {
    if(event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = (e:any)=>{
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    //if someone clicks cancel
    else {
      this.imgSrc = "../../assets/default.png";
      this.selectedImage = null;
    }
  }

}
