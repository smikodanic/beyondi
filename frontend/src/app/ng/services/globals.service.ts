/**
 * Global variables
 */
import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs'; // observable



@Injectable()
export class GlobalsService {

  private _loggedUser: any;
  // private _currentSiteObs: Subject<any>;
  private _currentSite: any;

  constructor() {
    // this._currentSiteObs = new Subject<any>(); // init observable subject
  }



  /* loggedUser */
  set loggedUser(v: any) {
    this._loggedUser = v;
  }

  get loggedUser() {
    return this._loggedUser;
  }


  /* currentSite */
  // usage: this.globalsService.currentSite = ...
  set currentSite(v: any) {
    // this._currentSiteObs.next(v); // send next stream value
    this._currentSite = v;
  }

  // usage: this.globalsService.currentSite.subscribe(v => this.curSite = v);
  get currentSite() {
    // return this._currentSiteObs;
    return this._currentSite;
  }




}
