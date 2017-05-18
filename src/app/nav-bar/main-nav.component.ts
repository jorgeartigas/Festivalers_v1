import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CurrentUserData } from '../services/user-data.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent{
  constructor(
    public router: Router,
    public userData: CurrentUserData,
    public loginService: LoginService
  ){}

  logout(){
    this.loginService.logout();
  }
}
