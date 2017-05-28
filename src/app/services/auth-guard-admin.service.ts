import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate{
  go:boolean;
  constructor(
    private af: AngularFire, 
    private userData: CurrentUserData,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.af.auth.map((auth) =>  {
        if(auth) {
          this.af.database.object('FESTIVALERS/Users/'+auth.uid).first().subscribe(user => {
            this.userData.currentUser = user;
            if(this.userData.currentUser.isAdmin){
               this.go = true;
            }
            return this.go; 
          });
        }else{
          this.router.navigate(['home']);
          return false;
        }
      }).first()
    }
}