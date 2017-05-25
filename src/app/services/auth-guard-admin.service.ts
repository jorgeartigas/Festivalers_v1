import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate{
  constructor(
    private af: AngularFire, 
    private userData: CurrentUserData,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.af.database.object('FESTIVALERS/Users/'+this.userData.userUID).map(user=>{
       if(user.isAdmin==="true"){
          return true;
       }else{
          this.router.navigate(["home"]);
          return false;
       }       
    }).first();
  }
}