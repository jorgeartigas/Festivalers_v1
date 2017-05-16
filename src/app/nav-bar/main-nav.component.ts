import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
    public userService: UserService,
    public router: Router,
    public userData: CurrentUserData
  ){}

  ngOnInit(){
    console.log(this.userData.userUID);
  }

  logout(){
    this.userService.logout();
  }
}
