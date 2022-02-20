import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, pipe } from 'rxjs';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm : FormGroup;
  imgSrc:string;
  selectedImage : any;
  isSubmitted:Boolean;

  constructor(private storage : AngularFireStorage , private imageService : ImageService) { }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      'categoryName' : new FormControl('',Validators.required), 
      'imageUrl' : new FormControl('' , Validators.required)
    });

    this.resetForm();

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

  onSubmit(formValue)
  {
    this.isSubmitted = true;
    if(this.categoryForm.valid)
    {
      var filePath = `categories/${this.selectedImage.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          //RETRIEVING THE UPLOADED IMAGE URL.
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
            this.imageService.insertCategories(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  resetForm()
  {
    this.categoryForm.reset();
    this.categoryForm.setValue({
      categoryName : '',
      imageUrl : ''
    });
    this.imgSrc = "../../assets/default.png";
    this.isSubmitted = false;
    this.selectedImage = null;
  }

}
