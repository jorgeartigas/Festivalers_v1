import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate{
  constructor(
    private af: AngularFire, 
    private userData: CurrentUserData
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.af.database.object('FESTIVALERS/Users/'+this.userData.userUID).map(snap=>{
       if(snap.isAdmin===true){
            return true;
       }
       return false;
    }).first();
  }
}