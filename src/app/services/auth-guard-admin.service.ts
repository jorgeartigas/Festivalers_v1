import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate{
  constructor(
    private af: AngularFire, 
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.af.database.object('FESTIVALERS/Users/'+this.userService.userUid).map(snap=>{
       if(snap.isAdmin===true){
            return true;
       }
       return false;
    }).first();
  }
}