import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router
  ){}

  isAdmin:Observable<boolean>;

  ngOnInit(){
    console.log("hola");
    this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin(this.userService.userUid);
  }
  
  logout(){
    this.userService.logout();
  }
}
