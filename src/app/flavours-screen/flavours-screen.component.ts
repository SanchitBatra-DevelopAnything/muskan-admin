import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-flavours-screen',
  templateUrl: './flavours-screen.component.html',
  styleUrls: ['./flavours-screen.component.css']
})
export class FlavoursScreenComponent implements OnInit {

  flavours : {flavourName : string , shopPrice : number , customerPrice : number}[];
  flavourKeys : string[];
  isLoading : boolean;

  constructor(private router : Router , private apiService : ApiserviceService) { }

  ngOnInit(): void {
    this.getAllFlavours();
  }

  getAllFlavours()
  {
    this.isLoading = true;
    this.apiService.getFlavours().subscribe((allFlavours)=>{
      this.flavours = Object.values(allFlavours);
      this.flavourKeys = Object.keys(allFlavours);
      this.isLoading = false;
    });
  }

  addNewFlavour()
  {
    this.router.navigate(['/cakes/addNewFlavour/flavour/0/0/new/randomKey']);
  }

  deleteFlavour(index)
  {
    this.isLoading = true;
    this.apiService.deleteFlavour(this.flavourKeys[index]).subscribe((_)=>{
      this.getAllFlavours();
      this.isLoading = false;
    }); 
  }

  editFlavour(index)
  {
    let flav = this.flavours[index].flavourName;
    let sp = this.flavours[index].shopPrice;
    let cp = this.flavours[index].customerPrice;
    let key = this.flavourKeys[index];
    console.log("FLAVOUR KI KEY HAI YE = ",key);
    this.router.navigate(['/cakes/addNewFlavour/'+flav+"/"+sp+"/"+cp+"/edit/"+key]);
  }

}
