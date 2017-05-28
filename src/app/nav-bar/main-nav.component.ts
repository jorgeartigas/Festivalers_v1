import { Component, OnInit, OnDestroy} from '@angular/core';
import { LoginService } from '../services/login.service';
import { CurrentUserData } from '../services/user-data.service';
import { UserService } from '../services/user.service';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit,OnDestroy{
  openNotification:boolean = false;
  notifications:any;
  sub:any;
  constructor(
    public router: Router,
    public userData: CurrentUserData,
    public loginService: LoginService,
    public af: AngularFire,
    private userService: UserService
  ){}
  ngOnInit(){
    this.af.auth.subscribe(auth =>{
      if(auth){
        this.sub = this.af.database.list('FESTIVALERS/UserNotifications/'+auth.uid).subscribe(snap => {
          this.notifications = snap;
        })
      }
      
    })
    
  }
  logout(){
    this.loginService.logout();
  }
  delete(id){
    this.userService.removeNotification(id);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
