import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  loggedInStatusUpdated : EventEmitter<Boolean>;

  constructor() { 
    this.loggedInStatusUpdated = new EventEmitter<Boolean>();
  }

}
