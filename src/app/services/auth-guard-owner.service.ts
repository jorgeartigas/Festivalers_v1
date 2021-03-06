import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuardOwner implements CanActivate{
  uid:string;
  constructor(private af: AngularFire, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.af.database.object('FESTIVALERS/festivales/'+route.params.id).map(festival => {
        this.af.auth.subscribe(auth => {
            if(auth)
                this.uid=auth.uid
            });
        if(this.uid){
            if(this.uid === festival.owner){
                return true;
            }else{
                this.router.navigate(['/home']);
                return false;
            }
        }else{
            this.router.navigate(['/home']);
            return false;
        }
        }).first()
  }
}