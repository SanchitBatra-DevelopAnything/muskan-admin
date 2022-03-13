import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  itemForm: FormGroup;
  imgSrc:string;
  selectedImage : any;
  isSubmitted:Boolean;
  parentCategoryData : {categoryKey : string , categoryName : string};
  availableSubcategories : any;
  selectedSubcategoryKey : string;

  constructor(private storage : AngularFireStorage , private apiService: ApiserviceService,private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.parentCategoryData = {categoryName : this.route.snapshot.params['categoryName'] , categoryKey : this.route.snapshot.params['categoryKey']};
    this.itemForm = new FormGroup({
      'itemName' : new FormControl('',[Validators.required]), 
      'imageUrl' : new FormControl('' , [Validators.required]),
      'subcategoryName' : new FormControl(null,[Validators.required]),
       'retailerPrice' : new FormControl('' , [Validators.required]),
       'wholesalePrice' : new FormControl('', [Validators.required]),
       'offer' : new FormControl('' , [Validators.required]),
    });

    this.resetForm();

    this.fetchAvailableSubcategories();

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
    if(this.itemForm.valid)
    {
      var filePath = `items/${this.selectedImage.name}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          //RETRIEVING THE UPLOADED IMAGE URL.
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
            this.apiService.addItem(formValue , this.parentCategoryData.categoryKey , this.selectedSubcategoryKey).subscribe((_)=>{
              this.resetForm();
            });
          });
        })
      ).subscribe();
    }
  }

  resetForm()
  {
    this.itemForm.reset();
    this.itemForm.setValue({
      itemName : '',
      imageUrl : '',
      subcategoryName : '',
      offer : '',
      retailerPrice : '',
      wholesalePrice: '',
    });
    this.imgSrc = "../../assets/default.png";
    this.isSubmitted = false;
    this.selectedImage = null;
  }

  fetchAvailableSubcategories()
  {
    this.apiService.getSubcategoriesOfCategory(this.parentCategoryData.categoryKey).subscribe((subcategories)=>{
      this.availableSubcategories = Object.values(subcategories);
    });
  }

}
