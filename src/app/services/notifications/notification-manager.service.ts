import { Injectable } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationManagerService {

  currentToken : any;

  constructor(private apiService:ApiserviceService) { }

  findParticularToken(name:string , shop:string) : string
  {
    this.apiService.findToken(name,shop).subscribe((token)=>{
      this.currentToken = token['token'];
    });
    return this.currentToken;
  }
}
