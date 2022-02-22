import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  loggedInStatusUpdated : Subject<boolean>;

  constructor() { 
    this.loggedInStatusUpdated = new Subject<boolean>();
  }

}
