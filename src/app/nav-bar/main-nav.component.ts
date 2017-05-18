import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CurrentUserData } from '../services/user-data.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  constructor(
    public router: Router,
    public userData: CurrentUserData,
    public loginService: LoginService
  ){}

  ngOnInit(){
    console.log(this.userData.userUID);
  }

  logout(){
    this.loginService.logout();
  }
}
