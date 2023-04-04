import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationManagerService {

  allNotificationData : any;

  constructor() { }

  setNotificationData(data)
  {
    this.allNotificationData = data;
  }

  findParticularToken(name:string) : string
  {
    var data =  this.allNotificationData.filter((notificationData)=>{
      return notificationData.name.toUpperCase() === name.toUpperCase();
    });
    console.log(data);
    return data[data.length-1].token.toString();
  }
}
