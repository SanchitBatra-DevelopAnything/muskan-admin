import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-design-category-screen',
  templateUrl: './design-category-screen.component.html',
  styleUrls: ['./design-category-screen.component.css']
})
export class DesignCategoryScreenComponent implements OnInit {

  designCategories : {designName : string , shopPrice : number , customerPrice : number}[];
  designKeys : string[];
  isLoading:boolean;

  constructor(private router:Router , private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.getAllDesignCategories();
  }

  getAllDesignCategories()
  {
    this.isLoading = true;
    this.designCategories = [];
    this.designKeys = []; 
    this.apiService.getDesignCategories().subscribe((allDesignCategories)=>{
      if(allDesignCategories == null)
      {
        this.designKeys = [];
        this.designCategories = [];
        this.isLoading = false;
        return;
      }
      this.designCategories = Object.values(allDesignCategories);
      this.designKeys = Object.keys(allDesignCategories);
      this.isLoading = false;
    });
  }

  addNewDesign()
  {
    this.router.navigate(['/cakes/addNewDesign/design/0/0/new/randomKey']);
  }

  deleteDesign(index)
  {
    this.isLoading = true;
    this.apiService.deleteDesign(this.designKeys[index]).subscribe((_)=>{
      this.getAllDesignCategories();
      this.isLoading = false;
    }); 
  }

  editDesign(index)
  {
    let design = this.designCategories[index].designName;
    let sp = this.designCategories[index].shopPrice;
    let cp = this.designCategories[index].customerPrice;
    let key = this.designKeys[index];
    console.log("DESIGN KEY HAI YE = ", key);
    this.router.navigate(['/cakes/addNewDesign/'+design+"/"+sp+"/"+cp+"/edit/"+key]);
  }

}
