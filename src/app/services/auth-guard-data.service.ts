import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';

@Injectable()
export class AuthGuardData implements CanActivate{
  constructor(
    private af: AngularFire, 
    private router: Router,
    private userData:CurrentUserData
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.af.auth.map((auth) =>  {
      if(auth) {
        this.userData.userUID = auth.uid;
        this.userData.isLoggedIn = true;
        this.af.database.object('FESTIVALERS/Users/'+auth.uid).first().subscribe(user => {
          this.userData.currentUser = user;
        });
        this.af.database.list('FESTIVALERS/UsersFestivals/'+auth.uid).first().subscribe(festivals => {
          festivals.forEach(fest => {
            this.userData.festivals.push(fest.$key);
          });
        })
        return true;
      }else{
        this.userData.isLoggedIn = false;
        return true;
      }
    }).first()
  }
}